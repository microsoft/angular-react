import { TestBed, inject } from '@angular/core/testing';

import { SubNavService } from './sub-nav.service';

describe('SubNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubNavService],
    });
  });

  it('should be created', inject([SubNavService], (service: SubNavService) => {
    expect(service).toBeTruthy();
  }));
});
