import { TestBed } from '@angular/core/testing';

import { DateWiseService } from './date-wise.service';

describe('DateWiseService', () => {
  let service: DateWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
