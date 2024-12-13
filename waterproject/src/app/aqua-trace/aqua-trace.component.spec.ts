import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquaTraceComponent } from './aqua-trace.component';

describe('AquaTraceComponent', () => {
  let component: AquaTraceComponent;
  let fixture: ComponentFixture<AquaTraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AquaTraceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AquaTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
