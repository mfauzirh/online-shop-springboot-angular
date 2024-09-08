import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.css'
})
export class CustomerModalComponent {
  isOpen: boolean = false;
  modalMode: string = 'view';
  customerId : number | null = null;
  customerForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  customerCode: string = '';
  customerLastOrderDate: string = '';

  @Output() formSubmit = new EventEmitter<void>();

  constructor(private builder: FormBuilder, private customerService: CustomerService) {
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
      if (this.customerForm.get('pic')?.value !== null) {
        formData.append('pic', this.customerForm.get('pic')?.value);
      }

      if (this.modalMode == "add") {
        this.customerService.addCustomer(formData).subscribe({
          next: response => {
            console.log("Successfully added customer")
            this.formSubmit.emit();
            this.closeModal();
          },
          error: error => {
            console.log("Error adding customers", error)
          }
        })
      } else if (this.modalMode == 'edit' && this.customerId) {
        this.customerService.editCustomer(this.customerId, formData).subscribe({
          next: response => {
            console.log("Successfully updated customer")
            this.formSubmit.emit();
            this.closeModal();
          },
          error: error => {
            console.log("Error updating customers", error)
          }
        })
      }
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

  openModal(modalMode: string, customerId: number | null) {
    // If modal mode is edit / view, fetch customer data first
    if (modalMode !== 'add' && customerId) {
      this.customerService.getCustomerById(customerId).subscribe({
        next: response => {
          let customer = response.data;
          this.customerForm = this.builder.group({
            customerName: [customer?.customerName, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            customerAddress: [customer?.customerAddress, Validators.required],
            customerPhone: [customer?.customerPhone, [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
            pic: [null]
          });
          this.previewUrl = customer?.pic ?? '';
          this.customerCode = customer?.customerCode ?? '';
          this.customerLastOrderDate = customer?.lastOrderDate ?? '';
        },
        error: error => {
          console.log("Error fetching customers", error)
        }
      })
    }

    this.modalMode = modalMode;
    this.customerId = customerId;

    this.isOpen = true;
  }

  closeModal() {
    this.customerId = null;
    this.previewUrl = null;
    this.customerForm = this.builder.group({
      customerName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      customerAddress: ['', Validators.required],
      customerPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      pic: [null, Validators.required]
    });
    this.isOpen = false;
  }
}
