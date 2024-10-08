import { Component, Input } from '@angular/core';
import { EventBusService } from '../../../services/event-bus.service';

@Component({
  selector: 'tr[app-customer-list-item]',
  templateUrl: './customer-list-item.component.html',
  styleUrl: './customer-list-item.component.css'
})
export class CustomerListItemComponent {
  @Input() customer : any = [];

  constructor(private events: EventBusService) {}

  // Publish open modal event (view mode) to customer component to open modal
  onView() {
    this.events.viewCustomer(this.customer.customerId);
  }

  // Publish open modal event (edit mode) to customer component to open modal
  onEdit() {
    this.events.editCustomer(this.customer.customerId);
  }

  // Publish open delete modal event to customer component to open delete modal
  onDelete() {
    this.events.deleteCustomer(this.customer.customerId);
  }
}
