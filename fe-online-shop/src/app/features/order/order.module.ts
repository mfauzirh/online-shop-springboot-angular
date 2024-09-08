import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { OrderDeleteModalComponent } from './order-delete-modal/order-delete-modal.component';
import { OrderModalComponent } from './order-modal/order-modal.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrderFilterComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderDeleteModalComponent,
    OrderModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent
  ],
  exports: [
    OrderComponent
  ]
})
export class OrderModule { }
