import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrl: './item-modal.component.css'
})
export class ItemModalComponent {
  isOpen: boolean = false;
  modalMode: string = 'view';
  itemId : number | null = null;
  itemForm: FormGroup;
  itemCode: string = '';
  lastReStock: string = '';

  @Output() formSubmit = new EventEmitter<void>();

  constructor(private builder: FormBuilder, private itemService: ItemService) {
    this.itemForm = this.builder.group({
      itemName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      stock: [0, Validators.required],
      price: [0, Validators.required],
      isAvailable: [true, Validators.required],
    });
  }

  // Based on form mode, make request to backend
  // After that trigger form submitted event, so item component can react to re-fetch new data
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.itemForm.valid) {
      const itemData = {
        itemName: this.itemForm.get('itemName')?.value,
        stock: this.itemForm.get('stock')?.value,
        price: this.itemForm.get('price')?.value,
        isAvailable: this.itemForm.get('isAvailable')?.value
      };
  
      if (this.modalMode == "add") {
        this.itemService.addItem(itemData).subscribe({
          next: response => {
            console.log("Successfully added item");
            this.formSubmit.emit();
            this.closeModal();
          },
          error: error => {
            console.log("Error adding item", error);
          }
        });
      } else if (this.modalMode == 'edit' && this.itemId) {
        this.itemService.editItem(this.itemId, itemData).subscribe({
          next: response => {
            console.log("Successfully updated item");
            this.formSubmit.emit();
            this.closeModal();
          },
          error: error => {
            console.log("Error updating item", error);
          }
        });
      }
    }
  }
  

  // Open modal, and based on modal mode
  // Fetch data if mode is edit/view,
  // Just open if the mode is add new
  openModal(modalMode: string, itemId: number | null) {
    // If modal mode is edit / view, fetch item data first
    if (modalMode !== 'add' && itemId) {
      this.itemService.getItemById(itemId).subscribe({
        next: response => {
          let item = response.data;
          this.itemForm = this.builder.group({
            itemName: [item?.itemName, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
            stock: [item?.stock, Validators.required],
            price: [item?.price, Validators.required],
            isAvailable: [item?.isAvailable, Validators.required],
          });

          this.itemCode = item?.itemCode ?? '';
          this.lastReStock = item?.lastReStock ?? '';
        },
        error: error => {
          console.log("Error fetching item", error)
        }
      })
    }

    this.modalMode = modalMode;
    this.itemId = itemId;

    this.isOpen = true;
  }

  // When close modal, set form value to default
  closeModal() {
    this.itemId = null;
    this.itemCode = '';
    this.lastReStock = '';
    
    this.itemForm = this.builder.group({
      itemName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      stock: [0, Validators.required],
      price: [0, Validators.required],
      isAvailable: [true, Validators.required],
    });

    this.isOpen = false;
  }
}
