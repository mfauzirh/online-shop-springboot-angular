import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/footer/nav-bar/nav-bar.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { CustomerModule } from './features/customer/customer.module';
import { ItemModule } from './features/item/item.module';
import { OrderModule } from './features/order/order.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavBarComponent, 
    NavBarComponent, 
    FooterComponent, 
    CustomerModule, 
    ItemModule, OrderModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
