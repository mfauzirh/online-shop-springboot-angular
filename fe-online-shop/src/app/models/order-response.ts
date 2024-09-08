export interface OrderResponse {
  orderId: number;
  orderCode: string
  orderDate: string;
  totalPrice: number;
  quantity: number;
  customerId: number;
  customerName: string;
  customerAddress: string;
  customerPic: string;
  customerPhone: string;
  itemId: number;
  itemName: string;
  stock: number;
  price: number;
}