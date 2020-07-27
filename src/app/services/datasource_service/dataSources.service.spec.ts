/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataSourcesService } from './dataSources.service';

describe('Service: DataSources', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSourcesService]
    });
  });

  it('should ...', inject([DataSourcesService], (service: DataSourcesService) => {
    expect(service).toBeTruthy();
  }));
});
