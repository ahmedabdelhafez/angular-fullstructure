/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreloadStartegyService } from './preload-startegy.service';

describe('Service: PreloadStartegy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadStartegyService]
    });
  });

  it('should ...', inject([PreloadStartegyService], (service: PreloadStartegyService) => {
    expect(service).toBeTruthy();
  }));
});
