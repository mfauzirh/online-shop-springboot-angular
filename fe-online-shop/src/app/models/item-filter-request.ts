export interface ItemFilterRequest {
  itemId?: number | null;
  itemName?: string | null;
  stock?: number | null;
  price?: string | null;
  isAvailable?: boolean | null;
  sortBy?: string | null;
  pageSize?: number | null;
  pageNumber?: number | null;
}

