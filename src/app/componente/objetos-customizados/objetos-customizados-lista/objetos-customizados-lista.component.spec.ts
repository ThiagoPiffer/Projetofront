import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosCustomizadosListaComponent } from './objetos-customizados-lista.component';

describe('ObjetosCustomizadosListaComponent', () => {
  let component: ObjetosCustomizadosListaComponent;
  let fixture: ComponentFixture<ObjetosCustomizadosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetosCustomizadosListaComponent]
    });
    fixture = TestBed.createComponent(ObjetosCustomizadosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
