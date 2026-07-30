import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Site } from 'src/app/core/models/site/Site';
import { CreateSite } from 'src/app/core/models/site/CreateSiteRequest';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private api = `${environment.apiUrl}/Sites`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.api);
  }

  getById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.api}/${id}`);
  }

  create(site: CreateSite): Observable<Site> {
    return this.http.post<Site>(this.api, site);
  }

  update(id: number, site: CreateSite): Observable<void> {
    
    return this.http.put<void>(`${this.api}/${id}`, site);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}