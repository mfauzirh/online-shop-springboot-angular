import { Component, Input } from '@angular/core';
import { OrderPreviewResponse } from '../../../models/order-preview-response';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  @Input() orders: OrderPreviewResponse[] = [];
}
