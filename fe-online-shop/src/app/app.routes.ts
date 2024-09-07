import { Routes } from '@angular/router';
import { CustomerComponent } from './features/customer/customer.component';
import { ItemComponent } from './features/item/item/item.component';
import { OrderComponent } from './features/order/order/order.component';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { CustomerDetailComponent } from './features/customer/customer-detail/customer-detail.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer/:id', component: CustomerDetailComponent},
  {path: 'item-list', component: ItemComponent},
  {path: 'order-list', component: OrderComponent},
  {path: '**', component: NotFoundComponent},
];
