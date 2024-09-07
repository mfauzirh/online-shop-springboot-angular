import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-add-form',
  templateUrl: './customer-add-form.component.html',
  styleUrl: './customer-add-form.component.css'
})
export class CustomerAddFormComponent {
  @Output() formSubmit = new EventEmitter<void>();

  customerForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private builder: FormBuilder, private http: HttpClient) {
    this.customerForm = this.builder.group({
      customerName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      customerAddress: ['', Validators.required],
      customerPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      pic: [null, Validators.required]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.customerForm.valid) {
      const formData = new FormData();
      formData.append('customerName', this.customerForm.get('customerName')?.value);
      formData.append('customerAddress', this.customerForm.get('customerAddress')?.value);
      formData.append('customerPhone', this.customerForm.get('customerPhone')?.value);
      formData.append('pic', this.customerForm.get('pic')?.value);

      this.http.post('http://localhost:8080/customers', formData).subscribe(response => {
        this.formSubmit.emit();
        this.closeModal();
        this.customerForm.reset();
        this.previewUrl = null;
      }, error => {
        console.error('Error adding customer', error);
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const fileControl = this.customerForm.get('pic');
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };

      if (file.size > 5 * 1024 * 1024) { // Example size limit (5 MB)
        fileControl?.setErrors({ 'fileSize': 'File size exceeds 5 MB' });
      } else if (file.type === 'image/jpeg' || file.type === 'image/png') {
        fileControl?.setValue(file);
        fileControl?.setErrors(null); // Clear errors if valid
        reader.readAsDataURL(file);
      } else {
        fileControl?.setErrors({ 'invalidFileType': 'Invalid file format. Only JPG, JPEG, and PNG are allowed.' });
      }
      fileControl?.updateValueAndValidity();
    } else {
      fileControl?.setErrors({ 'required': 'PIC is required.' });
      fileControl?.updateValueAndValidity();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('addCustomerModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
      modalElement.removeAttribute('role');

      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);
      }
    }
  }
}