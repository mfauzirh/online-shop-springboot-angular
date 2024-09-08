import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemListItemComponent } from './item-list-item/item-list-item.component';
import { ItemFilterComponent } from './item-filter/item-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ItemDeleteModalComponent } from './item-delete-modal/item-delete-modal.component';
import { ItemModalComponent } from './item-modal/item-modal.component';



@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemFilterComponent,
    ItemListItemComponent,
    ItemDeleteModalComponent,
    ItemModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
