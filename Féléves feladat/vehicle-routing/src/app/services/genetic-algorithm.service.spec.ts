import { TestBed } from '@angular/core/testing';

import { GeneticAlgorithmService } from './genetic-algorithm.service';

describe('GeneticAlgorithmService', () => {
  let service: GeneticAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneticAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
