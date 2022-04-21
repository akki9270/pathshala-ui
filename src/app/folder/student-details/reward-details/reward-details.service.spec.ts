import { TestBed } from '@angular/core/testing';

import { RewardDetailsService } from './reward-details.service';

describe('RewardDetailsService', () => {
  let service: RewardDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
