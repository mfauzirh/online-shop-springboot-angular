import { Component, OnInit } from '@angular/core';

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
export class CustomerListComponent implements OnInit{
  customers: CustomerPreviewResponse[] = [];
  page = 1;
  pageSize = 5;

  constructor() {
    // Example data, replace with your actual data fetching logic
    for (let i = 1; i <= 6; i++) {
      this.customers.push({
        customerId: i,
        customerName: `Customer ${i}`,
        customerAddress: `Address ${i}`,
        customerCode: "13i21ioj412io4j12ijr",
        pic: 'https://mdbootstrap.com/img/new/avatars/8.jpg' // Placeholder image
      });
    }
  }

  ngOnInit(): void {}

  get paginatedCustomers(): CustomerPreviewResponse[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.customers.slice(start, end);
  }

  onPageChange(page: number): void {
    this.page = page;
  }
}
