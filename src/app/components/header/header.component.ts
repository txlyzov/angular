import { Component, OnInit } from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';
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
    // const message$ = fromEvent<StorageEvent>(window, "storage").pipe(
    //   filter(event => event.storageArea === sessionStorage),
    //   filter(event => event.key === "AuthToken"),
    //   map(event => event.newValue)
    // );
    
    // window.addEventListener('storage', function (e) {
    //   if (e.storageArea === sessionStorage && e.key === 'AuthToken') {
    //     // Something on another page changed the stored value.
    //     console.log(12);
        
    //   }
    // });
  }

  logout() {
    this.tokenStorageService.signOut();
    this.authService.headerUpdate();
  }
}
