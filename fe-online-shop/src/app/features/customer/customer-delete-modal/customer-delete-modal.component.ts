import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-delete-modal',
  templateUrl: './customer-delete-modal.component.html',
  styleUrl: './customer-delete-modal.component.css'
})
export class CustomerDeleteModalComponent {
  isOpen: boolean = false;
  customerId : number | undefined;
  
  @Output() customerDeleted = new EventEmitter<number>();

  constructor(private customerService: CustomerService) {}

  // Assign customer id when modal is open
  openModal(customerId: number) {
    if(customerId) {
      this.customerId = customerId;
      this.isOpen = true;
    }
  }

  // Set default customer id when modal is closed
  closeModal() {
    this.customerId = undefined;
    this.isOpen = false;
  }

  // When delete executed, make request, then trigger customer deleted event 
  // customer component will react and re-fetch the new data
  onDelete() {
    if (!this.customerId) {
      console.error("Customer id not set yet")
      return;
    }

    this.customerService.deleteCustomer(this.customerId!).subscribe({
      next: response => {
        console.log(response)
        console.log("Sucess deleted customer");
        this.closeModal();
        this.customerDeleted.emit();
      },
      error: error => {
        console.log("Error fetching customers", error)
      }
    })
  }
}
