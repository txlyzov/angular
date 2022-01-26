import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent {
  form = new FormGroup({
    login: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  get password() {
    return this.form.get('pessword');
  }
  get confirmedPassword() {
    return this.form.get('confirmPassword');
  }

  submit(): void {
    if (this.dataCheck()) {
      this.authService.registerUser(this.form.getRawValue()).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        },
      );
    } else alert('Passwords are different.');
  }

  dataCheck() {
    return this.form.value.password === this.form.value.confirmPassword;
  }
}
