import { TestBed } from '@angular/core/testing';

import { StudentWiseService } from './student-wise.service';

describe('StudentWiseService', () => {
  let service: StudentWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
