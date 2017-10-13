import { TestBed, inject } from '@angular/core/testing';

import { CriteriaCheckService } from './criteria-check.service';

describe('CriteriaCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CriteriaCheckService]
    });
  });

  it('should be created', inject([CriteriaCheckService], (service: CriteriaCheckService) => {
    expect(service).toBeTruthy();
  }));
});
