import { TestBed } from '@angular/core/testing';

import { BookedRewardsService } from './booked-rewards.service';

describe('BookedRewardsService', () => {
  let service: BookedRewardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedRewardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
