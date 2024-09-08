import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { OrderResponse } from '../../../models/order-response';
import { CustomerPreviewResponse } from '../../../models/customer-preview-response.model';
import { CustomerService } from '../../../services/customer.service';
import { ItemService } from '../../../services/item.service';
import { ItemPreviewResponse } from '../../../models/item-preview-response';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.css'
})
export class OrderModalComponent {
  isOpen: boolean = false;
  modalMode: string = 'view';
  orderId : number | null = null;
  orderForm: FormGroup;

  order: OrderResponse | null = null;
  customerList: CustomerPreviewResponse[] = [];
  itemList: ItemPreviewResponse[] = [];

  @Output() formSubmit = new EventEmitter<void>();

  constructor(
    private builder: FormBuilder, 
    private orderService: OrderService,
    private customerService: CustomerService,
    private itemService: ItemService
  ) {
    this.orderForm = this.builder.group({
      customerId: [0, Validators.required],
      itemId: [0, Validators.required],
      quantity: [0, Validators.required]
    });
  }

  // Based on form mode, make request to backend
  // After that trigger form submitted event, so item component can react to re-fetch new data
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.orderForm.valid) {
      const orderData = {
        customerId: this.orderForm.get('customerId')?.value,
        itemId: this.orderForm.get('itemId')?.value,
        quantity: this.orderForm.get('quantity')?.value
      };
  
      if (this.modalMode == "add") {
        this.orderService.addOrder(orderData).subscribe({
          next: response => {
            console.log("Successfully added order");
            this.formSubmit.emit();
            this.closeModal();
          },
          error: error => {
            console.log("Error adding item", error);
          }
        });
      } else if (this.modalMode == 'edit' && this.orderId) {
        this.orderService.editOrder(this.orderId, { quantity: orderData.quantity }).subscribe({
          next: response => {
            console.log("Successfully updated order");
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
  openModal(modalMode: string, orderId: number | null) {
    // If modal mode is edit / view, fetch item data first
    if (modalMode !== 'add' && orderId) {
      this.orderService.getOrderById(orderId).subscribe({
        next: response => {
          let order = response.data;
          this.order = order ?? null;

          this.orderForm = this.builder.group({
            customerId: [order?.customerId, Validators.required],
            itemId: [order?.itemId, Validators.required],
            quantity: [order?.quantity, Validators.required]
          });
        },
        error: error => {
          console.log("Error fetching order", error)
        }
      })
    }

    // Fetch customer and item list -- to be added later Guard for minus order quanity because out of stock
    this.customerService.getAllCustomers(new HttpParams()).subscribe({
      next: response => {
        this.customerList = response.data && modalMode === 'view'
          ? response.data.filter(e => e.customerId === this.order?.customerId)
          : response.data ?? [];
      },
      error: error => {
        console.log("Error fetching customer", error)
      }
    })

    this.itemService.getAllItems(new HttpParams()).subscribe({
      next: response => {
        this.itemList = response.data && modalMode === 'view'
          ? response.data.filter(e => e.itemId === this.order?.itemId)
          : response.data ?? [];
      },
      error: error => {
        console.log("Error fetching item", error)
      }
    })

    this.modalMode = modalMode;
    this.orderId = orderId;

    this.isOpen = true;
  }

  // When close modal, set form value to default
  closeModal() {
    this.orderId = null;
    this.order = null;
    
    this.orderForm = this.builder.group({
      customerId: [0, Validators.required],
      itemId: [0, Validators.required],
      quantity: [0, Validators.required]
    });

    this.isOpen = false;
  }
}
