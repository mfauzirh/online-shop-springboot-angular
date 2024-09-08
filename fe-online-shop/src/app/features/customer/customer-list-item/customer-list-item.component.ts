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

  onView() {
    this.events.viewCustomer(this.customer.customerId);
  }

  onEdit() {
    this.events.editCustomer(this.customer.customerId);
  }

  onDelete() {
    this.events.deleteCustomer(this.customer.customerId);
  }
}
