import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryElementsBarComponent } from './gallery-elements-bar.component';

describe('GalleryElementsBarComponent', () => {
  let component: GalleryElementsBarComponent;
  let fixture: ComponentFixture<GalleryElementsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryElementsBarComponent],
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
