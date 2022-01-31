import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
