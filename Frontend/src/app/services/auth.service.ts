import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ms from 'ms';
import { AccessToken } from '../models/access-token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_KEY = 'userId';

  setAccessToken(token: AccessToken, expiresIn = '1d') {
    // calculate time, when refresh needs to be performed as timestamp
    // default expiration time is 1 day (same as on the backend)
    const refreshTime = Date.now() + ms(expiresIn);

    localStorage.setItem(this.TOKEN_KEY, JSON.stringify({
      ...token,
      refreshTime,
    }));
  }

  getAccessToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);

    return token ? JSON.parse(token) : null;
  }

  isExpired() {
    const token = this.getAccessToken();
    const now = Date.now();

    return (token === null || now > token.refreshTime);
  }

  signIn(email: string, password: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(environment.apiUrl + '/auth/email', {
      email,
      password,
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/users/me');
  }

  refresh(token: AccessToken): Observable<AccessToken> {
    return this.http.post<AccessToken>(environment.apiUrl + '/auth/refresh', token);
  }

  deleteAccessToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setUserId(userId: string) {
    localStorage.setItem(this.USER_KEY, userId);
  }

  getUserId() {
    return localStorage.getItem(this.USER_KEY);
  }

  deleteUserId() {
    localStorage.removeItem(this.USER_KEY);
  }
}
