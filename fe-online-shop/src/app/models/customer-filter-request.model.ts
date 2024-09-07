export interface CustomerFilterRequest {
  customerId?: number | null;
  customerName?: string | null;
  customerAddress?: string | null;
  sortBy?: string | null;
  pageSize?: number | null;
  pageNumber?: number | null;
}