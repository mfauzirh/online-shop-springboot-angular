export interface OrderPreviewResponse {
  orderId: number;
  orderCode: string
  orderDate: string;
  totalPrice: number;
  quantity: number;
  customerName: string;
  itemName: string;
}