import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testing123Component } from './testing123.component';

describe('Testing123Component', () => {
  let component: Testing123Component;
  let fixture: ComponentFixture<Testing123Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Testing123Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Testing123Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
