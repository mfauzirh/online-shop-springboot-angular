import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomerComponent, 
    CustomerListComponent, 
    PaginationComponent,
    CustomerFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CustomerComponent
  ]
})
export class CustomerModule { }
