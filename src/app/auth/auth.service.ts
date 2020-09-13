import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AuthData } from './models/auth-data.model';
import { User } from './models/user.model';
import { RegData } from './models/reg-data.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  token: string;

  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public get authStatus$(): Observable<boolean> {
    return this._isAuthenticated$;
  }
  public isAuthenticated(): boolean {
    return this._isAuthenticated$.value; // TODO check if not expired
  }

  public getToken(): string {
    return this.token;
  }

  public getUser(): User {
    return {
      ...this.user
    };
  }

  constructor(private router: Router) {
    this._autoAuth();
  }

  private _autoAuth() {
    const token = localStorage.getItem('token');
    if (token) { // TODO also check expiration
      this.token = token;
      this._isAuthenticated$.next(true);
    }
  }

  registerUser(data: RegData) {
    // call to edpoint with data, receive token
    const token = 'someToken';

    this.user = {
      email: data.email,
      userId: Math.round(Math.random() * 10000)
    };
    this._authSuccess(token);
  }

  login(credentials: AuthData): Observable<boolean> {
    const token = credentials.password === '1234' ? 'tokenFromServer' : null;
    // fake verification, result being a token

    if (token) {
      this.user = {
        email: credentials.email,
        userId: Math.round(Math.random() * 10000)
      };
      this._authSuccess(token);
      return of(true);
    } else {
      return of(false);
    }
  }

  private _authSuccess(token: string) {
    this._isAuthenticated$.next(true);
    localStorage.setItem('token', token);
    this.token = token;
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this._isAuthenticated$.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
