import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';

import { Site } from '../models/site/Site';

import { CreateSiteRequest } from '../models/site/CreateSiteRequest';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends ApiService {

  getAll(): Observable<Site[]> {

    return this.http.get<Site[]>(
      `${this.api}/sites`
    );

  }

  getById(id: number): Observable<Site> {

    return this.http.get<Site>(
      `${this.api}/sites/${id}`
    );

  }

  create(request: CreateSiteRequest): Observable<Site> {

    return this.http.post<Site>(
      `${this.api}/sites`,
      request
    );

  }

  update(
    id: number,
    request: CreateSiteRequest
  ): Observable<void> {

    return this.http.put<void>(
      `${this.api}/sites/${id}`,
      request
    );

  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.api}/sites/${id}`
    );

  }

}