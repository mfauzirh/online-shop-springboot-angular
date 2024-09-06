import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer/customer.component';
import { ItemComponent } from './item/item/item.component';
import { OrderComponent } from './order/order/order.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'customer-list', component: CustomerComponent},
  {path: 'item-list', component: ItemComponent},
  {path: 'order-list', component: OrderComponent},
  {path: '**', component: NotFoundComponent},
];
