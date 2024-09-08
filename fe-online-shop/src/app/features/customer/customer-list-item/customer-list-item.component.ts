import { Component, Input } from '@angular/core';

@Component({
  selector: 'tr[app-customer-list-item]',
  templateUrl: './customer-list-item.component.html',
  styleUrl: './customer-list-item.component.css'
})
export class CustomerListItemComponent {
  @Input() customer : any = [];
}
