import { TestBed } from '@angular/core/testing';

import { AddRewardService } from './add-reward.service';

describe('AddRewardService', () => {
  let service: AddRewardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRewardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
