import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Intervention } from 'src/app/core/models/intervention/Intervention';
import { CreateIntervention } from 'src/app/core/models/intervention/create-intervention';
import { ValiderIntervention } from 'src/app/core/models/intervention/valider-intervention';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  private apiUrl = `${environment.apiUrl}/Interventions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.apiUrl);
  }

  getById(id: number): Observable<Intervention> {
    return this.http.get<Intervention>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateIntervention): Observable<Intervention> {
    return this.http.post<Intervention>(this.apiUrl, data);
  }

  update(id: number, data: CreateIntervention) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  valider(data: ValiderIntervention) {
    return this.http.post(`${this.apiUrl}/validation`, data);
  }

  genererFiche(id: number) {
    return this.http.get(`${this.apiUrl}/${id}/fiche`, {
      responseType: 'blob'
    });
  }
}