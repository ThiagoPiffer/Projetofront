import { TestBed } from '@angular/core/testing';

import { ArquivoProcessoService } from './arquivo-processo.service';

describe('ArquivoProcessoService', () => {
  let service: ArquivoProcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArquivoProcessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
