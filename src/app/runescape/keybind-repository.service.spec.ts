import { TestBed } from '@angular/core/testing';

import { KeybindRepository } from './keybind-repository.service';

describe('KeybindRepositoryService', () => {
  let service: KeybindRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeybindRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
