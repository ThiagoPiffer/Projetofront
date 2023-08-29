import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoProcessoInserirDescricaoModalComponent } from './arquivo-processo-inserir-descricao-modal.component';

describe('ArquivoProcessoInserirDescricaoModalComponent', () => {
  let component: ArquivoProcessoInserirDescricaoModalComponent;
  let fixture: ComponentFixture<ArquivoProcessoInserirDescricaoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArquivoProcessoInserirDescricaoModalComponent]
    });
    fixture = TestBed.createComponent(ArquivoProcessoInserirDescricaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
