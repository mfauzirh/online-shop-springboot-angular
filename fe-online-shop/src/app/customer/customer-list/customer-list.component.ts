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
  page=1;
  pageSize=5;
  maxPageNumbersToShow = 3;

  constructor() {
    // Example data, replace with your actual data fetching logic
    for (let i = 1; i <= 200; i++) {
      this.customers.push({
        customerId: i,
        customerName: `Customer ${i}`,
        customerAddress: `Address ${i}`,
        customerCode: "13i21ioj412io4j12ijr",
        pic: 'https://mdbootstrap.com/img/new/avatars/8.jpg' // Placeholder image
      });
    }
  }

  ngOnInit(): void {
      
  }

  get paginatedCustomers(): CustomerPreviewResponse[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.customers.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.customers.length / this.pageSize);
  }

  get visiblePages(): number[] {
    const totalPages = this.totalPages;
    const pages: number[] = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > this.maxPageNumbersToShow) {
      const halfWay = Math.floor(this.maxPageNumbersToShow / 2);
      startPage = Math.max(this.page - halfWay, 1);
      endPage = Math.min(startPage + this.maxPageNumbersToShow - 1, totalPages);

      if (endPage - startPage < this.maxPageNumbersToShow - 1) {
        startPage = Math.max(endPage - this.maxPageNumbersToShow + 1, 1);
      }
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push(-1); // Ellipsis
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(-1); // Ellipsis
      pages.push(totalPages);
    }

    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
    }
  }
}
