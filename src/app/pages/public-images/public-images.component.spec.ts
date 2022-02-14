import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { PublicImagesComponent } from './public-images.component';

describe('PublicImagesComponent', () => {
  let component: PublicImagesComponent;
  let fixture: ComponentFixture<PublicImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicImagesComponent],
      imports: [HttpClientModule, RouterTestingModule, NgxPaginationModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
