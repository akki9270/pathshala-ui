import { TestBed } from '@angular/core/testing';

import { PointLedgerService } from './point-ledger.service';

describe('PointLedgerService', () => {
  let service: PointLedgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointLedgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
