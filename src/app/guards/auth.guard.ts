import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { regularExpressions as RE, routes } from '../utils/consts/consts';
import { TokenStorageService } from '../utils/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  regex = new RegExp(RE.AUTH_TOKEN);

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

    this.router.navigate([routes.LOGIN]);

    return false;
  }
}
