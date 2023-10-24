import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPessoaTemplateComponent } from './tipo-pessoa-template.component';

describe('TipoPessoaTemplateComponent', () => {
  let component: TipoPessoaTemplateComponent;
  let fixture: ComponentFixture<TipoPessoaTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoPessoaTemplateComponent]
    });
    fixture = TestBed.createComponent(TipoPessoaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
