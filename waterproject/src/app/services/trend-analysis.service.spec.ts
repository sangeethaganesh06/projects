import { TestBed } from '@angular/core/testing';

import { TrendAnalysisService } from './trend-analysis.service';

describe('TrendAnalysisService', () => {
  let service: TrendAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrendAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
