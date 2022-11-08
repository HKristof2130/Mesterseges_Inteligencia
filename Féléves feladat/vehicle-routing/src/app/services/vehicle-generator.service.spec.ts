import { TestBed } from '@angular/core/testing';

import { VehicleGeneratorService } from './vehicle-generator.service';

describe('VehicleGeneratorService', () => {
  let service: VehicleGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
