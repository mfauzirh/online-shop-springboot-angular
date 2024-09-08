import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerAddFormComponent } from './customer-add-form/customer-add-form.component';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CustomerListItemComponent } from './customer-list-item/customer-list-item.component';
import { CustomerDeleteModalComponent } from './customer-delete-modal/customer-delete-modal.component';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';

@NgModule({
  declarations: [
    CustomerComponent, 
    CustomerListComponent, 
    CustomerListItemComponent,
    PaginationComponent,
    CustomerFilterComponent,
    CustomerAddFormComponent,
    CustomerModalComponent,
    CustomerDeleteModalComponent
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
