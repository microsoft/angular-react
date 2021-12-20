import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { SubNavService } from './sub-nav.service';

describe('SubNavService', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SubNavService],
    }).compileComponents();
  }));

  it('should be created', inject([SubNavService], (service: SubNavService) => {
    expect(service).toBeTruthy();
  }));
});
