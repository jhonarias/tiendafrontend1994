import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductsResponse } from '../models/products-response.model';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/product-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URI = environment.apiUrlProduct;
  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.API_URI);
  }

  public getProduct(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.API_URI}/${id}`);
  }

  public createProduct(formData: FormData): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.API_URI}`, formData);
  }

  public deleteProduct(id: number): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(`${this.API_URI}/${id}`);
  }

  public updateProduct(formData: FormData, id: number): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.API_URI}/${id}`, formData);
  }
}
