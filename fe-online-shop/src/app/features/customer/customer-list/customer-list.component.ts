import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EventBusService } from '../../../services/event-bus.service';

interface CustomerPreviewResponse {
  customerId: number;
  customerName: string;
  customerAddress: string;
  customerCode: string;
  pic: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  @Input() customers: CustomerPreviewResponse[] = [];
  @Input() page: number = 1;
  @Input() pageSize: number = 5;
  @Output() pageChange = new EventEmitter<number>();
  @Output() customerDeleted =  new EventEmitter<number>();
  @Output() customerUpdated = new EventEmitter<number>();

  @ViewChild('deleteCustomerModal') deleteCustomerModal!: ModalComponent;

  deletedCustomer : number | undefined;

  constructor(private http: HttpClient, private eventBusService: EventBusService) {}

  // onPageChange(page: number): void {
  //   this.pageChange.emit(page);
  // }
  onCustomerUpdated(customerId: number) : void {
    this.customerUpdated.emit(customerId);
  }

  openDeleteModal(id: number): void {
    this.deleteCustomerModal.payload = { id }; // Set the payload
    this.eventBusService.openModal('Delete Customer');
  }

  // onCustomerDelete() : void {
  //   if (this.deletedCustomer !== null) {
  //     this.http.delete(`http://localhost:8080/customers/${this.deletedCustomer}`)
  //       .subscribe(() => {
  //         this.customerDeleted.emit(this.deletedCustomer);
  //         this.deletedCustomer = undefined;
  //         this.closeModal();
  //       }, (error) => {
  //         console.error('Delete failed', error);
  //       });
  //   }
  // }

  chooseDeletedCustomer(custmerId : number) {
    console.log("choosed")
    this.deletedCustomer = custmerId;
  }

  onCloseModal() {
    this.deletedCustomer = undefined;
    console.log('reseted')
  }

  closeModal() {
    const modalElement = document.getElementById('deleteModalLabel');
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