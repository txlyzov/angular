import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      password: '',
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getAuthorities();
    }
  }

  submit(): void {
    //console.log(this.form.getRawValue());
    this.authService.loginUser(this.form.getRawValue()).subscribe(
      (res) => {
        //console.log(res);

        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUsername(res.login);
        //this.tokenStorage.saveAuthorities(res.roles);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      (err: HttpErrorResponse) => {
        console.log(err.status);
        alert(err.message);
      },
    );
  }

  reloadPage() {
    this.authService.headerUpdate();
    this.router.navigate(['/']);
    //window.location.reload();
  }
}
