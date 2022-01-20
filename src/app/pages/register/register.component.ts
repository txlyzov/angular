import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: '',
      email: '',
      password: '',
    });
  }

  submit(): void {
    this.authService.registerUser(this.form.getRawValue()).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      },
    );
  }
}
