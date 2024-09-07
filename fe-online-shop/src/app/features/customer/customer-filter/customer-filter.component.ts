import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.css'
})
export class CustomerFilterComponent {
  @Output() search = new EventEmitter<any>();
  @Output() sort = new EventEmitter<string>();

  searchValue = '';
  searchBy = 'customerName';
  sortOptions = [
    'customerName,asc', 
    'customerName,desc', 
    'customerAddress,asc', 
    'customerAddress,desc', 
    'customerCode,asc', 
    'customerCode,desc'
  ];
  selectedSort = 'customerName,asc';

  // When search is triggered
  // Send filter criteria to parent for re-fetching customer with filter criteria
  onSearch(): void {
    const searchParams = {
      searchValue: this.searchValue,
      searchBy: this.searchBy
    };
    this.search.emit(searchParams);
  }

  // When sort is changed
  // Send sort criteria to parent for re-fetching customer with new sort criteria
  onSort(): void {
    this.sort.emit(this.selectedSort);
  }
}