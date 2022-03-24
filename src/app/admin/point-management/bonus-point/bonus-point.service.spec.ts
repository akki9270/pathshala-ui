import { TestBed } from '@angular/core/testing';

import { BonusPointService } from './bonus-point.service';

describe('BonusPointService', () => {
  let service: BonusPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonusPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
