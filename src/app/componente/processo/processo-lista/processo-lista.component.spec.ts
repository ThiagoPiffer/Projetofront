import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoListaComponent } from './processo-lista.component';

describe('ProcessoListaComponent', () => {
  let component: ProcessoListaComponent;
  let fixture: ComponentFixture<ProcessoListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessoListaComponent]
    });
    fixture = TestBed.createComponent(ProcessoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
