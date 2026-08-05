import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Facture } from 'src/app/core/models/facture/facture';
import { CreateFacture } from 'src/app/core/models/facture/create-facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private api = `${environment.apiUrl}/Facture`;

  constructor(private http: HttpClient) {}

  // ================================
  // GET ALL
  // ================================

  getAll(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.api);
  }

  // ================================
  // GET BY ID
  // ================================

  getById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.api}/${id}`);
  }

  // ================================
  // GENERER FACTURE
  // ================================

  create(facture: CreateFacture): Observable<Facture> {
    return this.http.post<Facture>(`${this.api}/generer`, facture);
  }

  // ================================
  // EXPORT PDF
  // ================================

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.api}/${id}/pdf`, {
      responseType: 'blob'
    });
  }

  // ================================
  // MARQUER ENVOYEE
  // ================================

  envoyer(id: number): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}/envoyer`, {});
  }

  // ================================
  // MARQUER PAYEE
  // ================================

  payer(id: number): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}/payer`, {});
  }

  // ================================
  // DELETE
  // ================================

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}