import { TestBed, inject } from '@angular/core/testing';

import { HttpHandle } from './httpHandle.service';

describe('HttpHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpHandle]
    });
  });

  it('should be created', inject([HttpHandle], (service: HttpHandle) => {
    expect(service).toBeTruthy();
  }));
});
