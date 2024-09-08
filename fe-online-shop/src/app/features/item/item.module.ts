import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemListItemComponent } from './item-list-item/item-list-item.component';



@NgModule({
  declarations: [
    ItemComponent,
    ItemListComponent,
    ItemListItemComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
