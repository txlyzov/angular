import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { testValues as TV } from 'src/app/utils/consts/consts';
import { componentId as CID } from './register-consts';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let spyEvent: jasmine.Spy<() => void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
      const button = fixture.nativeElement.querySelector(
        '#' + CID.SUBMIT_BUTTON,
      );
      const inputLogin = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_LOGIN,
      );
      const inputEmail = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_EMAIL,
      );
      const inputPassword = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_1,
      );
      const inputPasswordConfirm = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_2,
      );

      spyEvent = spyOn(component, 'submit');
      inputLogin.value = TV.STRING_1;
      inputEmail.value = TV.EMAIL_2;
      inputPassword.value = TV.STRING_3;
      inputPasswordConfirm.value = TV.STRING_4;
      inputLogin.dispatchEvent(new Event('input'));
      inputEmail.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));
      inputPasswordConfirm.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      button.click();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('Sign up button should NOT be pushed without correct form filling (email validation failed)', () => {
      const button = fixture.nativeElement.querySelector(
        '#' + CID.SUBMIT_BUTTON,
      );
      const inputLogin = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_LOGIN,
      );
      const inputEmail = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_EMAIL,
      );
      const inputPassword = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_1,
      );
      const inputPasswordConfirm = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_2,
      );

      spyEvent = spyOn(component, 'submit');
      inputLogin.value = TV.STRING_1;
      inputEmail.value = TV.STRING_2;
      inputPassword.value = TV.STRING_3;
      inputPasswordConfirm.value = TV.STRING_4;
      inputLogin.dispatchEvent(new Event('input'));
      inputEmail.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));
      inputPasswordConfirm.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      button.click();

      expect(spyEvent).not.toHaveBeenCalled();
    });
  });

  describe('Logic tests', () => {
    it('Should call authService.registerUser({login,email,password})', () => {
      const authService = TestBed.get(AuthService);
      const inputLogin = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_LOGIN,
      );
      const inputEmail = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_EMAIL,
      );
      const inputPassword = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_1,
      );
      const inputPasswordConfirm = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_2,
      );

      spyEvent = spyOn(authService, 'registerUser').and.returnValue({
      subscribe: () => {},  // eslint-disable-line
      });
      inputLogin.value = TV.STRING_1;
      inputEmail.value = TV.EMAIL_2;
      inputPassword.value = TV.STRING_3;
      inputPasswordConfirm.value = TV.STRING_3;
      inputLogin.dispatchEvent(new Event('input'));
      inputEmail.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));
      inputPasswordConfirm.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      component.submit();

      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('Should not call authService.registerUser({login,email,password}) because of mismatched passwords in form passwords fields', () => {
      const authService = TestBed.get(AuthService);
      const inputLogin = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_LOGIN,
      );
      const inputEmail = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_EMAIL,
      );
      const inputPassword = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_1,
      );
      const inputPasswordConfirm = fixture.nativeElement.querySelector(
        '#' + CID.INPUT_PASSWORD_2,
      );

      spyEvent = spyOn(authService, 'registerUser').and.returnValue({
      subscribe: () => {},  // eslint-disable-line
      });
      inputLogin.value = TV.STRING_1;
      inputEmail.value = TV.EMAIL_2;
      inputPassword.value = TV.STRING_3;
      inputPasswordConfirm.value = TV.STRING_4;
      inputLogin.dispatchEvent(new Event('input'));
      inputEmail.dispatchEvent(new Event('input'));
      inputPassword.dispatchEvent(new Event('input'));
      inputPasswordConfirm.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      component.submit();

      expect(spyEvent).not.toHaveBeenCalled();
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
