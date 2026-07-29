import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { LoginRequest } from '../models/auth/LoginRequest';
import { AuthResponse } from '../models/auth/AuthResponse';

//import { LoginRequest } from '../models/auth/login-request';

//import { AuthResponse } from '../models/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  login(
    request: LoginRequest
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.api}/auth/login`,
      request
    );

  }

  logout()
{
 return this.http.post(
   `${this.api}/auth/logout`,
   {}
 );
}

}