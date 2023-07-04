import { TestBed } from '@angular/core/testing';

import { RotationRepository } from './rotation-repository.service';

describe('RotationRepositoryService', () => {
  let service: RotationRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotationRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
