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

  getToken() {
    return this.token.asObservable();
  }
  getLogin() {
    return this.login.asObservable();
  }

  signOut() {
    window.localStorage.clear();
    this.token.next(localStorage.getItem(TOKEN_KEY));
    this.login.next(localStorage.getItem(LOGIN_KEY));
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this.token.next(localStorage.getItem(TOKEN_KEY));
  }

  // public getToken(): string | null {
  //   return localStorage.getItem(TOKEN_KEY);
  // }

  public saveLogin(login: string) {
    window.localStorage.removeItem(LOGIN_KEY);
    window.localStorage.setItem(LOGIN_KEY, login);
    this.login.next(localStorage.getItem(LOGIN_KEY));
  }

  // public getLogin(): string | null {
  //   return localStorage.getItem(LOGIN_KEY);
  // }

  // public saveAuthorities(authorities: string[]) {
  //   console.log('saveAuthorities');
  //   console.log(authorities);
  //   window.localStorage.removeItem(AUTHORITIES_KEY);
  //   window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  // }

  // public getAuthorities(): string[] {
  //   this.roles = [];

  //   if (localStorage.getItem(TOKEN_KEY)) {
  //     console.log('test');
  //     console.log(localStorage.getItem(AUTHORITIES_KEY));
  //     JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(
  //       (authority) => {
  //         this.roles.push(authority);
  //       },
  //     );
  //   }

  //   return this.roles;
  // }
}
