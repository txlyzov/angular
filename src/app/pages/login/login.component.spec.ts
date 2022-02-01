import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { testValues as TV } from 'src/app/utils/consts/consts';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spyEvent: jasmine.Spy<() => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (spyEvent) {
      spyEvent.calls.reset();
    }
  });

  describe('UI tests', () => {
    it('Sign up button should be pushed with correct form filling', () => {
      const button = fixture.nativeElement.querySelector('#submitButton');
      const inputLogin = fixture.nativeElement.querySelector('#inputId');
      const inputPassword =
        fixture.nativeElement.querySelector('#inputPassword1');

      spyEvent = spyOn(component, 'submit');
      inputLogin.value = TV.STRING_1;
      inputPassword.value = TV.STRING_2;
      inputLogin.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      button.click();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('Sign up button should NOT be pushed without correct form filling (empty login field)', () => {
      const button = fixture.nativeElement.querySelector('#submitButton');
      const inputLogin = fixture.nativeElement.querySelector('#inputId');
      const inputPassword =
        fixture.nativeElement.querySelector('#inputPassword1');

      spyEvent = spyOn(component, 'submit');
      inputLogin.value = TV.NULL;
      inputPassword.value = TV.STRING_2;
      inputLogin.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      button.click();

      expect(spyEvent).toHaveBeenCalledTimes(0);
    });
  });

  describe('Logic tests', () => {
    it('should call authService.loginUser({login,password})', () => {
      const authService = TestBed.get(AuthService);

      spyEvent = spyOn(authService, 'loginUser').and.returnValue({
        subscribe: () => {},  // eslint-disable-line
      });

      fixture.detectChanges();
      component.submit();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
