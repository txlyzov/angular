import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../utils/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  regex = new RegExp('(^[A-Za-z0-9-_]*.[A-Za-z0-9-_]*.[A-Za-z0-9-_]*$)');

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
    this.router.navigate(['/login']);

    return false;
  }
}
