import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ModalComponent } from '../../shared/modal/modal.component';



@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    ModalComponent
  ],
  exports: [
    ItemComponent
  ]
})
export class ItemModule { }
