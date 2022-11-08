import { TestBed } from '@angular/core/testing';

import { DestinatonsGeneratorService } from './route-generator.service';

describe('RouteGeneratorService', () => {
  let service: DestinatonsGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinatonsGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
