import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../utils/consts/routes';
import { regularExpressions as RE } from '../utils/consts/regular-expressions';
import { TokenStorageService } from '../utils/token-storage/token-storage.service';

const { LOGIN } = routes;

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  regex = new RegExp(RE.AUTH_TOKEN_REG_EXP);

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenStorageService.getToken().getValue();

    if (token && this.regex.test(token)) {
      return true;
    }

    this.router.navigate([LOGIN]);

    return false;
  }
}
