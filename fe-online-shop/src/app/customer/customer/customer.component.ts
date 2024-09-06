import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface CustomerPreviewResponse {
  customerId: number;
  customerName: string;
  customerAddress: string;
  customerCode: string;
  pic: string;
}

interface CustomerApiResponse {
  total: number | null,
  data: CustomerPreviewResponse[],
  message: string,
  statusCode: number,
  status: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: CustomerPreviewResponse[] = [];
  total = 0;
  page = 1;
  pageSize = 5;
  sortBy = 'customerName,asc';
  searchParams = {
    searchValue: '',
    searchBy: '' // Default search criterion
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    let params = new HttpParams()
      .set('pageNumber', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set(this.searchParams.searchBy, this.searchParams.searchValue); // Use the selected search criterion
    
    this.http.get<CustomerApiResponse>('http://localhost:8080/customers', { params })
      .subscribe(response => {
        this.customers = response.data;
        this.total = response.total ?? 0;
      });
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchCustomers();
  }

  onSearch(searchParams: any): void {
    this.searchParams = searchParams;
    this.page = 1; // Reset to first page on new search
    this.fetchCustomers();
  }

  onSort(sortBy: string): void {
    this.sortBy = sortBy;
    this.page = 1; // Reset to first page on new sort
    this.fetchCustomers();
  }
}