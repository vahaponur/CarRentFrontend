import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBrandColorComponent } from './car-brand-color.component';

describe('CarBrandColorComponent', () => {
  let component: CarBrandColorComponent;
  let fixture: ComponentFixture<CarBrandColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarBrandColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBrandColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
