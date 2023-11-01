import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaListaPaginaComponent } from './pessoa-lista-pagina.component';

describe('PessoaListaPaginaComponent', () => {
  let component: PessoaListaPaginaComponent;
  let fixture: ComponentFixture<PessoaListaPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaListaPaginaComponent]
    });
    fixture = TestBed.createComponent(PessoaListaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
