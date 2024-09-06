import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer/customer.component';
import { ItemComponent } from './item/item/item.component';
import { OrderComponent } from './order/order/order.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer/:id', component: CustomerDetailComponent},
  {path: 'item-list', component: ItemComponent},
  {path: 'order-list', component: OrderComponent},
  {path: '**', component: NotFoundComponent},
];
