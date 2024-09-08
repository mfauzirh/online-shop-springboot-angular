import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  visiblePages: number[] = [];
  maxPageNumbersToShow = 3;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['pageSize'] || changes['page']) {
      this.updatePagination();
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.visiblePages = this.getVisiblePages();
  }

  // Limit the number of page show in pagination,
  getVisiblePages(): number[] {
    const pages: number[] = [];
    const totalPages = this.totalPages;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > this.maxPageNumbersToShow) {
      const halfWay = Math.floor(this.maxPageNumbersToShow / 2);
      startPage = Math.max(this.page - halfWay, 1);
      endPage = Math.min(startPage + this.maxPageNumbersToShow - 1, totalPages);

      if (endPage - startPage < this.maxPageNumbersToShow - 1) {
        startPage = Math.max(endPage - this.maxPageNumbersToShow + 1, 1);
      }
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push(-1); // Ellipsis
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(-1); // Ellipsis
      pages.push(totalPages);
    }

    return pages;
  }

  // Send the new page request to parent
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.pageChange.emit(this.page);
    }
  }
}
