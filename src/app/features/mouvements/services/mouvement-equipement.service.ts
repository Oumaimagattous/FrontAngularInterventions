import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { MouvementEquipement } from 'src/app/core/models/mouvement/mouvement-equipement';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MouvementEquipementService {


  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/MouvementEquipement`;


  getAll(): Observable<MouvementEquipement[]> {

    return this.http.get<MouvementEquipement[]>(this.apiUrl);

  }


  getByIntervention(id:number): Observable<MouvementEquipement[]> {

    return this.http.get<MouvementEquipement[]>(
      `${this.apiUrl}/intervention/${id}`
    );

  }

}