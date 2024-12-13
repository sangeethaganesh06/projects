import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterQualityFormComponent } from './water-quality-form.component';

describe('WaterQualityFormComponent', () => {
  let component: WaterQualityFormComponent;
  let fixture: ComponentFixture<WaterQualityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterQualityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterQualityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
