import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Moulinette } from 'src/app/core/models/moulinette/moulinette';
import { CreateMoulinette } from 'src/app/core/models/moulinette/create-moulinette';

@Injectable({
  providedIn: 'root'
})
export class MoulinetteService {

  private api = `${environment.apiUrl}/Moulinette`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Moulinette[]> {
    return this.http.get<Moulinette[]>(this.api);
  }

  getById(id: number): Observable<Moulinette> {
    return this.http.get<Moulinette>(`${this.api}/${id}`);
  }

  create(data: CreateMoulinette): Observable<Moulinette> {
    return this.http.post<Moulinette>(this.api, data);
  }

  exportExcel(id: number): Observable<Blob> {
    return this.http.get(
      `${this.api}/${id}/excel`,
      {
        responseType: 'blob'
      }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}