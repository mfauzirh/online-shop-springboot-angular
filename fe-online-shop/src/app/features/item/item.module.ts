import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemListItemComponent } from './item-list-item/item-list-item.component';
import { ItemFilterComponent } from './item-filter/item-filter.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/pagination/pagination.component';



@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemFilterComponent,
    ItemListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
