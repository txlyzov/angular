import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  token$!: Observable<string | null>;
  login$!: Observable<string | null>;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.token$ = this.tokenStorageService.getObservableToken();
    this.login$ = this.tokenStorageService.getObservableLogin();
  }

  logout() {
    this.tokenStorageService.signOut();
  }
}
