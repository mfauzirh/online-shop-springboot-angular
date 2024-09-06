import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { CustomerAddFormComponent } from './customer-add-form/customer-add-form.component';

@NgModule({
  declarations: [
    CustomerComponent, 
    CustomerListComponent, 
    PaginationComponent,
    CustomerFilterComponent,
    CustomerAddFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    ReactiveFormsModule
  ],
  exports: [
    CustomerComponent
  ]
})
export class CustomerModule { }
