import { TestBed } from '@angular/core/testing';

import { PointRedemptionService } from './point-redemption.service';

describe('PointRedemptionService', () => {
  let service: PointRedemptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointRedemptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
