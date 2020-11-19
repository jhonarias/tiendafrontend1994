import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoriesResponse } from '../models/categories-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URI = environment.apiUrlCategory;
  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(this.API_URI);
  }
}
