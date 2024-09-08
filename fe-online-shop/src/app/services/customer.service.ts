import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BaseResponse } from '../models/base-response.model';
import { CustomerPreviewResponse } from '../models/customer-preview-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/customers';

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(params: HttpParams): Observable<BaseResponse<CustomerPreviewResponse[]>> {
    return this.httpClient.get<BaseResponse<CustomerPreviewResponse[]>>(this.apiUrl, { params });
  }

  deleteCustomer(customerId: number): Observable<BaseResponse<String>> {
    return this.httpClient.delete<BaseResponse<String>>(`${this.apiUrl}/${customerId}`)
  }
}
