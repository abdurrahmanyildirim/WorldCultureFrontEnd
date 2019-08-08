/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FamousPlaceService } from './famous-place.service';

describe('Service: FamousPlace', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamousPlaceService]
    });
  });

  it('should ...', inject([FamousPlaceService], (service: FamousPlaceService) => {
    expect(service).toBeTruthy();
  }));
});
