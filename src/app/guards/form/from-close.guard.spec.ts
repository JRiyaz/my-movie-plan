import { TestBed } from '@angular/core/testing';

import { FromCloseGuard } from './from-close.guard';

describe('FromCloseGuard', () => {
  let guard: FromCloseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FromCloseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
