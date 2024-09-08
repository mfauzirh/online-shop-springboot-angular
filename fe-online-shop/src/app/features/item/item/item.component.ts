import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ItemPreviewResponse } from '../../../models/item-preview-response';
import { ItemService } from '../../../services/item.service';
import { EventBusService } from '../../../services/event-bus.service';
import { HttpParams } from '@angular/common/http';
import { CustomerDeleteModalComponent } from '../../customer/customer-delete-modal/customer-delete-modal.component';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, AfterViewInit {
  @ViewChild('itemModal') itemModal!: ItemModalComponent;
  @ViewChild('deleteItemModal') deleteItemModal!: CustomerDeleteModalComponent;

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
  filterStock = '';

  constructor(
    private itemService: ItemService,
    private eventBusService: EventBusService
  ) {}

  ngAfterViewInit(): void {
    this.eventBusService.itemActions$.subscribe(event => {
      if (event.action === 'view') {
        this.itemModal.openModal('view', event.payload);
      } else if (event.action === 'edit') {
        this.itemModal.openModal('edit', event.payload);
      } else if (event.action === 'delete') {
        this.deleteItemModal.openModal(event.payload);
      }
    });
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  // On add customer button press, show customer modal with add mode
  onAddItem() : void {
    this.itemModal.openModal("add", null);
  }

  // Set the new page request to re-fetch the customer
  onPageChange(page: number): void {
    this.page = page;
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
    this.filterPrice = filterPrice;
    this.page = 1;
    this.fetchItems();
  }

  // Set new filter price criteria and using it to re-fetch the customer
  onFilterStock(filterStock: string): void {
    this.filterStock = filterStock;
    this.page = 1;
    this.fetchItems();
  }

  // On (update/delete) fetch new customer
  onFormSubmit() {
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

    if (this.filterStock.length > 0) {
      params = params.set('stock', this.filterStock);
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
