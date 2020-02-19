import { TestBed, inject } from '@angular/core/testing';

import { PurhasedataService } from './purhasedata.service';

describe('PurhasedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurhasedataService]
    });
  });

  it('should be created', inject([PurhasedataService], (service: PurhasedataService) => {
    expect(service).toBeTruthy();
  }));
});
