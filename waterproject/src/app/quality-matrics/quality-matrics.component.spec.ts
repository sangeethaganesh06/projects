import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMatricsComponent } from './quality-matrics.component';

describe('QualityMatricsComponent', () => {
  let component: QualityMatricsComponent;
  let fixture: ComponentFixture<QualityMatricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityMatricsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityMatricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
