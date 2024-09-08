import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrl: './item-filter.component.css'
})
export class ItemFilterComponent {
  @Output() search = new EventEmitter<any>();
  @Output() sort = new EventEmitter<string>();
  @Output() filterPrice = new EventEmitter<string>();

  searchValue = '';
  searchBy = 'itemName';

  sortOptions = [
    'itemName,asc', 
    'itemName,desc', 
    'stock,asc', 
    'stock,desc', 
    'price,asc', 
    'price,desc', 
  ];
  selectedSort = 'itemName,asc';

  filterPriceOptions = [
    '0-1000000',
    '1000000-2500000',
    '2500000'
  ];
  selectedFilterPriceCriteria = "";

  // When search is triggered
  // Send filter criteria to parent for re-fetching item with filter criteria
  onSearch(): void {
    const searchParams = {
      searchValue: this.searchValue,
      searchBy: this.searchBy
    };
    this.search.emit(searchParams);
  }

  // When sort is changed
  // Send sort criteria to parent for re-fetching item with new sort criteria
  onSort(): void {
    this.sort.emit(this.selectedSort);
  }

  // When filter price criteria changed
  // Send filter price criteria to parent for re-fetching item with new filter price criteria
  onFilterPriceCriteria(): void {
    this.filterPrice.emit(this.selectedFilterPriceCriteria);
  }
}
