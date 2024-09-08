import { Component, Input} from '@angular/core';
import { CustomerPreviewResponse } from '../../../models/customer-preview-response.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent {
  @Input() customers: CustomerPreviewResponse[] = [];
}