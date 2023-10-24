import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPessoaComponent } from './tipo-pessoa.component';

describe('TipoPessoaComponent', () => {
  let component: TipoPessoaComponent;
  let fixture: ComponentFixture<TipoPessoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoPessoaComponent]
    });
    fixture = TestBed.createComponent(TipoPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
