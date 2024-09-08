import { Component, Input } from '@angular/core';
import { EventBusService } from '../../../services/event-bus.service';

@Component({
  selector: 'tr[app-item-list-item]',
  templateUrl: './item-list-item.component.html',
  styleUrl: './item-list-item.component.css'
})
export class ItemListItemComponent {
  @Input() item : any;

  constructor(private events: EventBusService) {}

  // Publish open modal event (view mode) to customer component to open modal
  onView() {
    this.events.viewItem(this.item.itemId);
  }

  // Publish open modal event (edit mode) to customer component to open modal
  onEdit() {
    this.events.editItem(this.item.itemId);
  }

  // Publish open delete modal event to customer component to open delete modal
  onDelete() {
    this.events.deleteItem(this.item.itemId);
  }
}
