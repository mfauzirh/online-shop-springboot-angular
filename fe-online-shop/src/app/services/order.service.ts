import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response.model';
import { OrderPreviewResponse } from '../models/order-preview-response';
import { OrderResponse } from '../models/order-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/orders';

  constructor(private httpClient: HttpClient) { }

  getAllOrders(params: HttpParams): Observable<BaseResponse<OrderPreviewResponse[]>> {
    return this.httpClient.get<BaseResponse<OrderPreviewResponse[]>>(this.apiUrl, {params});
  }

  getOrderById(orderId: number): Observable<BaseResponse<OrderResponse>> {
    return this.httpClient.get<BaseResponse<OrderResponse>>(`${this.apiUrl}/${orderId}`);
  }

  deleteOrder(orderId: number): Observable<BaseResponse<String>> {
    return this.httpClient.delete<BaseResponse<String>>(`${this.apiUrl}/${orderId}`)
  }

  addOrder(order: any): Observable<BaseResponse<String>> {
    return this.httpClient.post<BaseResponse<String>>(this.apiUrl, order);
  }

  editOrder(orderId: number, order: any): Observable<BaseResponse<String>> {
    return this.httpClient.put<BaseResponse<String>>(`${this.apiUrl}/${orderId}`, order);
  }

  downloadReport(): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.apiUrl}/generate-report`, {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        'Accept': 'application/pdf'
      })
    });
  }
}
