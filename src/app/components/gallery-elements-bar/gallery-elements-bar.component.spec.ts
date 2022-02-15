import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GalleryElementsBarComponent } from './gallery-elements-bar.component';

describe('GalleryElementsBarComponent', () => {
  let component: GalleryElementsBarComponent;
  let fixture: ComponentFixture<GalleryElementsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryElementsBarComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryElementsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
