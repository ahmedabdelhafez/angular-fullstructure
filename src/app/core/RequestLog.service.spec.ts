/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestLogService } from "./RequestLogService";

describe('Service: RequestLog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestLogService]
    });
  });

  it('should ...', inject([RequestLogService], (service: RequestLogService) => {
    expect(service).toBeTruthy();
  }));
});
