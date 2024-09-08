import { Component, Input } from '@angular/core';
import { ItemPreviewResponse } from '../../../models/item-preview-response';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  @Input() items: ItemPreviewResponse[] = [];
}
