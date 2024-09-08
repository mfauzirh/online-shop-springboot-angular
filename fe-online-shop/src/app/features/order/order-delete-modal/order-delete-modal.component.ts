import { Component, EventEmitter, Output } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-delete-modal',
  templateUrl: './order-delete-modal.component.html',
  styleUrl: './order-delete-modal.component.css'
})
export class OrderDeleteModalComponent {
  isOpen: boolean = false;
  orderId : number | undefined;
  
  @Output() orderDeleted = new EventEmitter<number>();

  constructor(private orderService: OrderService) {}

  // Assign order id when modal is open
  openModal(orderId: number) {
    if(orderId) {
      this.orderId = orderId;
      this.isOpen = true;
    }
  }

  // Set default order id when modal is closed
  closeModal() {
    this.orderId = undefined;
    this.isOpen = false;
  }

  // When delete executed, make request, then trigger order deleted event 
  // order component will react and re-fetch the new data
  onDelete() {
    if (!this.orderId) {
      console.error("Order id not set yet")
      return;
    }

    this.orderService.deleteOrder(this.orderId!).subscribe({
      next: response => {
        console.log(response)
        console.log("Sucess deleted order");
        this.closeModal();
        this.orderDeleted.emit();
      },
      error: error => {
        console.log("Error fetching orders", error)
      }
    })
  }
}
