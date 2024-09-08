import { Component, Input } from '@angular/core';
import { EventBusService } from '../../../services/event-bus.service';

@Component({
  selector: 'tr[app-order-list-item]',
  templateUrl: './order-list-item.component.html',
  styleUrl: './order-list-item.component.css'
})
export class OrderListItemComponent {
  @Input() order : any;

  constructor(private events: EventBusService) {}

  // Publish open modal event (view mode) to order component to open modal
  onView() {
    this.events.viewOrder(this.order.orderId);
  }

  // Publish open modal event (edit mode) to order component to open modal
  onEdit() {
    this.events.editOrder(this.order.orderId);
  }

  // Publish open delete modal event to order component to open delete modal
  onDelete() {
    this.events.deleteOrder(this.order.orderId);
  }
}