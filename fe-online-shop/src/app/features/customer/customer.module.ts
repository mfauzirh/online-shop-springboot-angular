import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerAddFormComponent } from './customer-add-form/customer-add-form.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { RouterLink } from '@angular/router';
import { CustomerUpdateFormComponent } from './customer-update-form/customer-update-form.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@NgModule({
  declarations: [
    CustomerComponent, 
    CustomerListComponent, 
    PaginationComponent,
    CustomerFilterComponent,
    CustomerAddFormComponent,
    CustomerUpdateFormComponent,
    CustomerDetailComponent
  ],
  imports: [
    ModalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    CustomerComponent
  ]
})
export class CustomerModule { }
