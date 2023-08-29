import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCadastroModalComponent } from './pessoa-cadastro-modal.component';

describe('PessoaCadastroModalComponent', () => {
  let component: PessoaCadastroModalComponent;
  let fixture: ComponentFixture<PessoaCadastroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaCadastroModalComponent]
    });
    fixture = TestBed.createComponent(PessoaCadastroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
