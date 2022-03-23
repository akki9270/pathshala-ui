import { TestBed } from '@angular/core/testing';

import { TeacherWiseService } from './teacher-wise.service';

describe('TeacherWiseService', () => {
  let service: TeacherWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
