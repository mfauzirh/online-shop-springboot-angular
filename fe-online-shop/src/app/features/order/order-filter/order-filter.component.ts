import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.css'
})
export class OrderFilterComponent {
  @Output() search = new EventEmitter<any>();
  @Output() sort = new EventEmitter<string>();

  searchValue = '';
  searchBy = 'customerName';
  sortOptions = [
    'orderDate,asc', 
    'orderDate,desc', 
    'orderCode,asc', 
    'orderCode,desc', 
    'quantity,asc', 
    'quantity,desc', 
    'customerName,asc', 
    'customerName,desc', 
    'itemName,asc', 
    'itemName,desc', 
    'totalPrice,asc', 
    'totalPrice,desc'
  ];
  selectedSort = 'customerName,asc';

  // When search is triggered
  // Send filter criteria to parent for re-fetching order with filter criteria
  onSearch(): void {
    const searchParams = {
      searchValue: this.searchValue,
      searchBy: this.searchBy
    };
    this.search.emit(searchParams);
  }

  // When sort is changed
  // Send sort criteria to parent for re-fetching order with new sort criteria
  onSort(): void {
    this.sort.emit(this.selectedSort);
  }
}
