import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerPreviewResponse } from '../../models/customer-preview-response.model';
import { CustomerService } from '../../services/customer.service';
import { EventBusService } from '../../services/event-bus.service';
import { CustomerDeleteModalComponent } from './customer-delete-modal/customer-delete-modal.component';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, AfterViewInit {
  @ViewChild('addCustomerModal') addCustomerModal!: ElementRef;
  // @ViewChild('deleteCustomerModal') deleteCustomerModal!: ModalComponent;

  @ViewChild('customerModal') customerModal!: CustomerModalComponent;
  @ViewChild('deleteCustomerModal') deleteCustomerModal!: CustomerDeleteModalComponent;

  customers: CustomerPreviewResponse[] = [];
  total = 0;
  page = 1;
  pageSize = 5;
  sortBy = 'customerName,asc';
  searchParams = {
    searchValue: '',
    searchBy: ''
  };

  deletedCustomerId : number | undefined;
  
  constructor(
    private customerService: CustomerService,
    private eventBusService: EventBusService
  ) {}

  ngAfterViewInit(): void {
    this.eventBusService.customerActions$.subscribe(event => {
      if (event.action === 'view') {
        this.customerModal.openModal('view', event.payload);
      } else if (event.action === 'edit') {
        this.customerModal.openModal('edit', event.payload);
      } else if (event.action === 'delete') {
        this.deletedCustomerId = event.payload;
        this.deleteCustomerModal.openModal(event.payload);
      }
    });
  }

  ngOnInit(): void {
    this.fetchCustomers();
  }

  onAddCustomer() : void {
    this.customerModal.openModal("add", null);
  }

  // Set the new page request to re-fetch the customer
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

  // On (update/delete) fetch new customer
  onFormSubmit() {
    this.fetchCustomers();
  }

  // Make request to fetch customers
  fetchCustomers(): void {
    let params = new HttpParams()
      .set('pageNumber', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set(this.searchParams.searchBy, this.searchParams.searchValue);
    
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
}