import { Component, OnInit } from '@angular/core';
import { ItemPreviewResponse } from '../../../models/item-preview-response';
import { ItemService } from '../../../services/item.service';
import { EventBusService } from '../../../services/event-bus.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: ItemPreviewResponse[] = [];
  total = 0;
  page = 1;
  pageSize = 5;
  sortBy = 'itemName,asc';
  searchParams = {
    searchValue: '',
    searchBy: '',
  };
  filterPrice = '';

  constructor(
    private itemService: ItemService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  // Set the new search criteria and using it to re-fetch the customer
  onSearch(searchParams: any): void {
    this.searchParams = searchParams;
    this.page = 1;
    this.fetchItems();
  }

  // Set the new sort criteria and using it to re-fetch the customer
  onSort(sortBy: string): void {
    this.sortBy = sortBy;
    this.page = 1;
    this.fetchItems();
  }

  // Set new filter price criteria and using it to re-fetch the customer
  onFilterPrice(filterPrice: string): void {
    console.log("triggered")
    this.filterPrice = filterPrice;
    this.page = 1;
    this.fetchItems();
  }

  // Make request to fetch items
  fetchItems() : void {
    let params = new HttpParams()
      .set('pageNumber', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set(this.searchParams.searchBy, this.searchParams.searchValue);

    if (this.filterPrice.length > 0) {
      params = params.set('price', this.filterPrice);
    }
    
    this.itemService.getAllItems(params).subscribe({
      next: response => {
        this.items = response.data ?? [];
        this.total = response.total ?? 0;
      },
      error: error => {
        console.error("Error when fetching items", error);
      }
    });
  }
}
