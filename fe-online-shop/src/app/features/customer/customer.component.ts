import { HttpParams, HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerPreviewResponse } from '../../models/customer-preview-response.model';
import { CustomerService } from '../../services/customer.service';
import { EventBusService } from '../../services/event-bus.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CustomerDeleteModalComponent } from './customer-delete-modal/customer-delete-modal.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, AfterViewInit {
  @ViewChild('addCustomerModal') addCustomerModal!: ElementRef;
  // @ViewChild('deleteCustomerModal') deleteCustomerModal!: ModalComponent;

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

  updatedCustomerId : number | undefined;
  deletedCustomerId : number | undefined;

  constructor(
    private http: HttpClient, 
    private customerService: CustomerService,
    private eventBusService: EventBusService
  ) {}

  ngAfterViewInit(): void {
    this.eventBusService.modalEvents$.subscribe(({ name, event, payload }) => {
      if (event === 'action' && name == "Delete Customer") {
        // this.onModalAction(name, payload);
        this.onCustomerDeleted();
      } 
    });

    this.eventBusService.customerActions$.subscribe(event => {
      if (event.action === 'view') {
        // this.viewCustomer(event.payload);
        console.log("receive event customer view", event.payload)
      } else if (event.action === 'edit') {
        // this.editCustomer(event.payload);
        console.log("receive event customer edit", event.payload)
      } else if (event.action === 'delete') {
        console.log(this.deleteCustomerModal)
        this.deletedCustomerId = event.payload;
        this.deleteCustomerModal.onOpen();
        console.log("receive event customer delete", event.payload)
      }
    });
  }

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
    this.deletedCustomerId = undefined;
    this.fetchCustomers();
  }
}