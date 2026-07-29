import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Client } from '../../../core/models/client/Client';
import { CreateClient } from '../../../core/models/client/CreateClient';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private api = `${environment.apiUrl}/Clients`;


  constructor(
    private http: HttpClient
  ) {}


  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api);
  }


  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.api}/${id}`);
  }


  create(client: CreateClient): Observable<Client> {
    return this.http.post<Client>(this.api, client);
  }


  update(id: number, client: CreateClient): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, client);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}