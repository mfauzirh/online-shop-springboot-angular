import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerPreviewResponse } from '../models/customer-preview-response.model';
import { BaseResponse } from '../models/base-response.model';
import { CustomerResponse } from '../models/customer-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/customers';

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(params: HttpParams): Observable<BaseResponse<CustomerPreviewResponse[]>> {
    return this.httpClient.get<BaseResponse<CustomerPreviewResponse[]>>(this.apiUrl, { params });
  }

  getCustomerById(customerId: number): Observable<BaseResponse<CustomerResponse>> {
    return this.httpClient.get<BaseResponse<CustomerResponse>>(`${this.apiUrl}/${customerId}`);
  }

  deleteCustomer(customerId: number): Observable<BaseResponse<String>> {
    return this.httpClient.delete<BaseResponse<String>>(`${this.apiUrl}/${customerId}`)
  }

  addCustomer(customer: FormData): Observable<BaseResponse<String>> {
    return this.httpClient.post<BaseResponse<String>>(this.apiUrl, customer);
  }

  editCustomer(customerId: number, customer: FormData): Observable<BaseResponse<String>> {
    return this.httpClient.put<BaseResponse<String>>(`${this.apiUrl}/${customerId}`, customer);
  }
}
