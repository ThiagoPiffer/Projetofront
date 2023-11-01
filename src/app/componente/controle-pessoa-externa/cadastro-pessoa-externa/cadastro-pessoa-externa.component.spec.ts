import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPessoaExternaComponent } from './cadastro-pessoa-externa.component';

describe('CadastroPessoaExternaComponent', () => {
  let component: CadastroPessoaExternaComponent;
  let fixture: ComponentFixture<CadastroPessoaExternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroPessoaExternaComponent]
    });
    fixture = TestBed.createComponent(CadastroPessoaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
