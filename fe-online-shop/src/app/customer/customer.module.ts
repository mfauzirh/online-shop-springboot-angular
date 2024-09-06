import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PaginationComponent } from '../pagination/pagination.component';



@NgModule({
  declarations: [CustomerComponent, CustomerListComponent, PaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CustomerComponent
  ]
})
export class CustomerModule { }
