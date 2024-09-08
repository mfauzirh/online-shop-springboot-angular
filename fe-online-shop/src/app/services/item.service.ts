import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response.model';
import { ItemPreviewResponse } from '../models/item-preview-response';
import { ItemResponse } from '../models/item-response';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8080/items';

  constructor(private httpClient: HttpClient) { }

  getAllItems(params: HttpParams): Observable<BaseResponse<ItemPreviewResponse[]>> {
    return this.httpClient.get<BaseResponse<ItemPreviewResponse[]>>(this.apiUrl, {params});
  }

  getItemById(itemId: number): Observable<BaseResponse<ItemResponse>> {
    return this.httpClient.get<BaseResponse<ItemResponse>>(`${this.apiUrl}/${itemId}`);
  }

  deleteItem(itemId: number): Observable<BaseResponse<String>> {
    return this.httpClient.delete<BaseResponse<String>>(`${this.apiUrl}/${itemId}`)
  }

  addItem(item: any): Observable<BaseResponse<String>> {
    return this.httpClient.post<BaseResponse<String>>(this.apiUrl, item);
  }

  editItem(itemId: number, item: any): Observable<BaseResponse<String>> {
    return this.httpClient.put<BaseResponse<String>>(`${this.apiUrl}/${itemId}`, item);
  }
}
