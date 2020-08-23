import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientResponse } from '../models/client-response.model';
import { ClientsResponse } from '../models/clients-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private API_URI = environment.apiUrlClient;
  constructor(private http: HttpClient) {
  }

  public getClients(): Observable<ClientsResponse> {
    return this.http.get<ClientsResponse>(this.API_URI);
  }

  public getClient(id: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.API_URI}/${id}`);
  }

  public createClient(formData: FormData): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(`${this.API_URI}`, formData);
  }

  public deleteClient(id: number): Observable<ClientResponse> {
    return this.http.delete<ClientResponse>(`${this.API_URI}/${id}`);
  }

  public updateClient(formData: FormData, id: number): Observable<ClientResponse> {
    return this.http.put<ClientResponse>(`${this.API_URI}/${id}`, formData);
  }
}

