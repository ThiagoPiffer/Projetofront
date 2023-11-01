import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaListaComponent } from './pessoa-lista.component';

describe('PessoaListaComponent', () => {
  let component: PessoaListaComponent;
  let fixture: ComponentFixture<PessoaListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaListaComponent]
    });
    fixture = TestBed.createComponent(PessoaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
