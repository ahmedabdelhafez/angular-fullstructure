/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderJwtService } from './header-jwt.service';

describe('Service: HeaderJwt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderJwtService]
    });
  });

  it('should ...', inject([HeaderJwtService], (service: HeaderJwtService) => {
    expect(service).toBeTruthy();
  }));
});
