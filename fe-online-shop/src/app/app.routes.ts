import { Routes } from '@angular/router';
import { CustomerComponent } from './features/customer/customer.component';
import { ItemComponent } from './features/item/item/item.component';
import { OrderComponent } from './features/order/order/order.component';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'item-list', component: ItemComponent},
  {path: 'order-list', component: OrderComponent},
  {path: '**', component: NotFoundComponent},
];
