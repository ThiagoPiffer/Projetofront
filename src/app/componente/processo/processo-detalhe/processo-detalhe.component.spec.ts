import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoDetalheComponent } from './processo-detalhe.component';

describe('ProcessoDetalheComponent', () => {
  let component: ProcessoDetalheComponent;
  let fixture: ComponentFixture<ProcessoDetalheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessoDetalheComponent]
    });
    fixture = TestBed.createComponent(ProcessoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
