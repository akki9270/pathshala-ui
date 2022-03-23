import { TestBed } from '@angular/core/testing';

import { MonthWiseService } from './month-wise.service';

describe('MonthWiseService', () => {
  let service: MonthWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
