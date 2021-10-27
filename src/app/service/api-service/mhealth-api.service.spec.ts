import { TestBed } from '@angular/core/testing';

import { MhealthApiService } from './mhealth-api.service';

describe('MhealthApiService', () => {
  let service: MhealthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MhealthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
