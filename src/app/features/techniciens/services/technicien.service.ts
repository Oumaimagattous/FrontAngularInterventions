import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Technicien } from '../../../core/models/technicien/technicien';

import { CreateTechnicien } from '../../../core/models/technicien/create-technicien';

import { UpdateTechnicien } from '../../../core/models/technicien/update-technicien';

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  private api =
    `${environment.apiUrl}/Technicien`;



  constructor(
    private http: HttpClient
  ) { }



  getAll(): Observable<Technicien[]> {

    return this.http.get<Technicien[]>(this.api);

  }



  getById(id: number): Observable<Technicien> {

    return this.http.get<Technicien>(
      `${this.api}/${id}`
    );

  }



  create(
    technicien: CreateTechnicien
  ): Observable<Technicien> {

    return this.http.post<Technicien>(
      this.api,
      technicien
    );

  }



  update(
    id: number,
    technicien: UpdateTechnicien
  ): Observable<void> {

    return this.http.put<void>(
      `${this.api}/${id}`,
      technicien
    );

  }



  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.api}/${id}`
    );

  }



  getInterventions(
    id: number
  ) {

    return this.http.get<any[]>(
      `${this.api}/${id}/interventions`
    );

  }

}