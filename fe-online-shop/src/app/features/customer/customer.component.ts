import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerPreviewResponse } from '../../models/customer-preview-response.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  @ViewChild('addCustomerModal') addCustomerModal!: ElementRef;

  customers: CustomerPreviewResponse[] = [];
  total = 0;
  page = 1;
  pageSize = 5;
  sortBy = 'customerName,asc';
  searchParams = {
    searchValue: '',
    searchBy: ''
  };

  updatedCustomerId : number | undefined;

  constructor(private http: HttpClient, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    let params = new HttpParams()
      .set('pageNumber', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set(this.searchParams.searchBy, this.searchParams.searchValue); // Use the selected search criterion
    
    this.customerService.getAllCustomers(params).subscribe({
      next: response => {
        this.customers = response.data ?? [];
        this.total = response.total ?? 0;
      },
      error: error => {
        console.log("Error fetching customers", error)
      }
    })
  }

  onPageChange(page: number): void {
    this.page = page;
    this.fetchCustomers();
  }

  // Set the new search criteria and using it to re-fetch the customer
  onSearch(searchParams: any): void {
    this.searchParams = searchParams;
    this.page = 1;
    this.fetchCustomers();
  }

  // Set the new sort criteria and using it to re-fetch the customer
  onSort(sortBy: string): void {
    this.sortBy = sortBy;
    this.page = 1;
    this.fetchCustomers();
  }

  onFormSubmit() {
    this.fetchCustomers();
  }
  
  onCustomerUpdated(customerId : number) {
    this.updatedCustomerId = customerId;
    console.log("Customer with id " + customerId + "is request updated")
    if (this.addCustomerModal) {
      const modal = new (window as any).bootstrap.Modal(this.addCustomerModal.nativeElement);
      modal.show();
    }
  }

  onCustomerDeleted() {
    console.log("event retrieved")
    this.fetchCustomers();
  }
}