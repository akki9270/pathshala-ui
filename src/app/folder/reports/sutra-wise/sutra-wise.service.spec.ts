import { TestBed } from '@angular/core/testing';

import { SutraWiseService } from './sutra-wise.service';

describe('SutraWiseService', () => {
  let service: SutraWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SutraWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
