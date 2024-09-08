import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-delete-modal',
  templateUrl: './customer-delete-modal.component.html',
  styleUrl: './customer-delete-modal.component.css'
})
export class CustomerDeleteModalComponent {
  isOpen: boolean = false;
  @Input() customerId : number | undefined;
  @Output() customerDeleted = new EventEmitter<number>();

  constructor(private customerService: CustomerService) {}

  onOpen() {
    this.isOpen = true;
  }

  onClose() {
    this.isOpen = false;
  }

  onDelete() {
    if (!this.customerId) {
      console.error("Customer id not set yet")
      return;
    }

    this.customerService.deleteCustomer(this.customerId!).subscribe({
      next: response => {
        console.log(response)
        console.log("Sucess deleted customer");
        this.onClose();
        this.customerDeleted.emit();
      },
      error: error => {
        console.log("Error fetching customers", error)
      }
    })
  }
}
