import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  loggedIn!: boolean;
  User!: string | null;

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
  ) {
    authService.refresHeader.subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.User = this.tokenStorageService.getUsername();
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    this.authService.headerUpdate();
  }
}
