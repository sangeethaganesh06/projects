import { TestBed } from '@angular/core/testing';

import { AdminFileUpladService } from './admin-file-uplad.service';

describe('AdminFileUpladService', () => {
  let service: AdminFileUpladService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFileUpladService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
