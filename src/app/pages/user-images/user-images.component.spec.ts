import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { UserImagesComponent } from './user-images.component';

describe('PublicImagesComponent', () => {
  let component: UserImagesComponent;
  let fixture: ComponentFixture<UserImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserImagesComponent],
      imports: [HttpClientModule, RouterTestingModule, NgxPaginationModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
