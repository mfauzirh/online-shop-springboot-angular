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
    searchBy: ''
  };

  constructor(
    private itemService: ItemService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  // Make request to fetch items
  fetchItems() : void {
    let params = new HttpParams()
      .set('pageNumber', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set(this.searchParams.searchBy, this.searchParams.searchValue);
    
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
