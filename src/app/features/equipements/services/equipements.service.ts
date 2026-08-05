import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Equipement } from 'src/app/core/models/equipement/equipement';
import { CreateEquipement } from 'src/app/core/models/equipement/create-equipement';
import { EquipementDetail } from
'src/app/core/models/equipement/equipement-detail';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  private api = `${environment.apiUrl}/Equipement`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.api);
  }

  getById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.api}/${id}`);
  }

  create(equipement: CreateEquipement): Observable<Equipement> {
    return this.http.post<Equipement>(this.api, equipement);
  }

  update(id: number, equipement: CreateEquipement): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}`, equipement);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
  getDetail(id: number): Observable<EquipementDetail> {

  return this.http.get<EquipementDetail>(
    `${this.api}/${id}/detail`
  );

}
}