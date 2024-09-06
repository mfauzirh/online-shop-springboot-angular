import { Component, Input, EventEmitter, Output } from '@angular/core';

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

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}