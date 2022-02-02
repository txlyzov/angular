import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/utils/token-storage/token-storage.service';
import { componentId as CID } from './login-consts';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  inputLogin = CID.INPUT_LOGIN;
  inputPassword1 = CID.INPUT_PASSWORD;
  submitButton = CID.SUBMIT_BUTTON;
  form = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
  ) {}

  submit(): void {
    this.authService.loginUser(this.form.getRawValue()).subscribe(
      (res) => {
        this.tokenStorageService.afterLogin(res.token, res.login);
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      },
    );
  }
}
