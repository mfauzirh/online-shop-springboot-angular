import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrderPreviewResponse } from '../../../models/order-preview-response';
import { OrderService } from '../../../services/order.service';
import { EventBusService } from '../../../services/event-bus.service';
import { HttpParams } from '@angular/common/http';
import { OrderDeleteModalComponent } from '../order-delete-modal/order-delete-modal.component';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, AfterViewInit {
  @ViewChild('deleteOrderModal') deleteOrderModal!: OrderDeleteModalComponent;
  @ViewChild('orderModal') orderModal!: OrderModalComponent;

  orders: OrderPreviewResponse[] = [];

  total = 0;
  page = 1;
  pageSize = 5;
  sortBy = 'orderDate,desc';
  searchParams = {
    searchValue: '',
    searchBy: '',
  };

  constructor(
    private orderService: OrderService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  ngAfterViewInit(): void {
    this.eventBusService.orderActions$.subscribe(event => {
      if (event.action === 'view') {
        this.orderModal.openModal('view', event.payload);
      } else if (event.action === 'edit') {
        this.orderModal.openModal('edit', event.payload);
      } else if (event.action === 'delete') {
        this.deleteOrderModal.openModal(event.payload);
      }
    });
  }

  // On add customer button press, show customer modal with add mode
  onAddOrder() : void {
    this.orderModal.openModal("add", null);
  }

  // Set the new page request to re-fetch the customer
  onPageChange(page: number): void {
    this.page = page;
    this.fetchOrders();
  }

  // Set the new search criteria and using it to re-fetch the customer
  onSearch(searchParams: any): void {
    this.searchParams = searchParams;
    this.page = 1;
    this.fetchOrders();
  }

  // Set the new sort criteria and using it to re-fetch the customer
  onSort(sortBy: string): void {
    this.sortBy = sortBy;
    this.page = 1;
    this.fetchOrders();
  }

  // Make request to fetch items
  fetchOrders() : void {
    let params = new HttpParams()
      .set('pageNumber', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set(this.searchParams.searchBy, this.searchParams.searchValue);
    
    this.orderService.getAllOrders(params).subscribe({
      next: response => {
        this.orders = response.data ?? [];
        this.total = response.total ?? 0;
        console.log(response.data)
      },
      error: error => {
        console.error("Error when fetching orders", error);
      }
    });
  }

  downloadFile(): void {
    this.orderService.downloadReport().subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order-report-${new Date().toISOString()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    });
  }
}
