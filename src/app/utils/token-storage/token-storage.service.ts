import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { errorsTexts } from '../consts/error-texts';
import { routes } from '../consts/routes';

const { AUTH_ERROR } = errorsTexts;
const { LOGIN } = routes;
const TOKEN_KEY = 'AuthToken';
const LOGIN_KEY = 'UserLogin';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private token = new BehaviorSubject<string | null>(
    window.localStorage.getItem(TOKEN_KEY),
  );
  private login = new BehaviorSubject<string | null>(
    window.localStorage.getItem(LOGIN_KEY),
  );

  constructor(private router: Router) {}

  getObservableToken() {
    return this.token.asObservable();
  }
  getObservableLogin() {
    return this.login.asObservable();
  }

  getToken() {
    return this.token;
  }

  signOut() {
    window.localStorage.clear();
    this.token.next(window.localStorage.getItem(TOKEN_KEY));
    this.login.next(window.localStorage.getItem(LOGIN_KEY));
  }

  errorSignOut() {
    window.localStorage.clear();
    this.token.next(window.localStorage.getItem(TOKEN_KEY));
    this.login.next(window.localStorage.getItem(LOGIN_KEY));
    alert(AUTH_ERROR);
    this.router.navigate([LOGIN]);
  }

  afterLogin(token: string, login: string) {
    this.saveToken(token);
    this.saveLogin(login);
    this.router.navigate([routes.PUBLIC_IMAGES]);
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this.token.next(window.localStorage.getItem(TOKEN_KEY));
  }

  public saveLogin(login: string) {
    window.localStorage.removeItem(LOGIN_KEY);
    window.localStorage.setItem(LOGIN_KEY, login);
    this.login.next(window.localStorage.getItem(LOGIN_KEY));
  }
}
