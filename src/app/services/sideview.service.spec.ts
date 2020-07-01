/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SideviewService } from './sideview.service';

describe('Service: Sideview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SideviewService]
    });
  });

  it('should ...', inject([SideviewService], (service: SideviewService) => {
    expect(service).toBeTruthy();
  }));
});
