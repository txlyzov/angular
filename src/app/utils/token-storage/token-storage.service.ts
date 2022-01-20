import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'AuthToken';
const LOGIN_KEY = 'UserLogin';
//const AUTHORITIES_KEY = 'AuthAuthorities';

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

  getObservableToken() {
    return this.token.asObservable();
  }
  getObservableLogin() {
    return this.login.asObservable();
  }

  signOut() {
    window.localStorage.clear();
    this.token.next(window.localStorage.getItem(TOKEN_KEY));
    this.login.next(window.localStorage.getItem(LOGIN_KEY));
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
