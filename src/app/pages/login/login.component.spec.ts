import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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

  describe('UI tests', () => {
    it('should push the Sigh up button', () => {
      const spyEvent = spyOn(component, 'submit');
      const button = fixture.debugElement.query(By.css('button'));
      const input1 = fixture.nativeElement.querySelector('#inputId');
      const input2 = fixture.nativeElement.querySelector('#inputPassword1');

      input1.value = 'value_for_input_1';
      input2.value = 'value_for_input_2';
      input1.dispatchEvent(new Event('input'));
      input2.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      spyEvent.calls.reset();

      button.nativeElement.click();

      expect(input1.value).toBe('value_for_input_1');
      expect(input2.value).toBe('value_for_input_2');
      expect(spyEvent).toHaveBeenCalled();
      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('should NOT push the Sigh up button', () => {
      const spyEvent = spyOn(component, 'submit');
      const button = fixture.debugElement.query(By.css('button'));
      const input1 = fixture.nativeElement.querySelector('#inputId');
      const input2 = fixture.nativeElement.querySelector('#inputPassword1');

      input1.value = '';
      input2.value = 'value_for_input_2';
      input1.dispatchEvent(new Event('input'));
      input2.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      spyEvent.calls.reset();

      button.nativeElement.click();

      expect(input1.value).toBe('');
      expect(input2.value).toBe('value_for_input_2');
      expect(spyEvent).toHaveBeenCalledTimes(0);
    });
  });

  describe('Logic tests', () => {
    it('should call tokenStorageService.afterLogin(token,login)', () => {
      const authService = TestBed.get(AuthService);
      const spyEvent = spyOn(authService, 'loginUser').and.returnValue({
        subscribe: () => {},
      });

      fixture.detectChanges();
      spyEvent.calls.reset();

      component.submit();

      expect(spyEvent).toHaveBeenCalled();
      expect(spyEvent).toHaveBeenCalledTimes(1);
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });
});
