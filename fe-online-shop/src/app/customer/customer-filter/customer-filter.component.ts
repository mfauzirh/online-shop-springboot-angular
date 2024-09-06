import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.css'
})
export class CustomerFilterComponent {
  searchValue = '';
  searchBy = 'customerName'; // Default search criterion
  sortOptions = ['customerName,asc', 'customerName,desc', 'customerAddress,asc', 'customerAddress,desc', 'customerCode,asc', 'customerCode,desc'];
  selectedSort = 'customerName,asc';

  @Output() search = new EventEmitter<any>();
  @Output() sort = new EventEmitter<string>();

  onSearch(): void {
    const searchParams = {
      searchValue: this.searchValue,
      searchBy: this.searchBy
    };
    this.search.emit(searchParams);
  }

  onSort(): void {
    this.sort.emit(this.selectedSort);
  }
}