export interface OrderFilterRequest {
  customerName?: string | null;
  itemName?: string | null;
  sortBy?: string | null;
  pageSize?: number | null;
  pageNumber?: number | null;
}

