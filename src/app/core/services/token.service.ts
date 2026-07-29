import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'current_user';

  save(token: string): void {

    localStorage.setItem(
      this.TOKEN_KEY,
      token
    );

  }

  saveUser(user: User): void {

  localStorage.setItem(
    this.USER_KEY,
    JSON.stringify(user)
  );

}

getToken(): string | null {

  return localStorage.getItem(
    this.TOKEN_KEY
  );

}

getUser(): User | null {

  const user =
      localStorage.getItem(this.USER_KEY);

  if (!user)
      return null;

  return JSON.parse(user);

}
getRole(): string {

    return this.getUser()?.role ?? '';

}

getNom(): string {

    return this.getUser()?.nom ?? '';

}

getEmail(): string {

    return this.getUser()?.email ?? '';

}

  

 
  isLogged(): boolean {

    //eturn this.get() != null;
    return this.getToken() != null;

  }

  logout(): void {

    localStorage.removeItem(
        this.TOKEN_KEY);

    localStorage.removeItem(
        this.USER_KEY);

}

}