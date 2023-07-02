import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosCustomizadosCadastroComponent } from './objetos-customizados-cadastro.component';

describe('ObjetosCustomizadosCadastroComponent', () => {
  let component: ObjetosCustomizadosCadastroComponent;
  let fixture: ComponentFixture<ObjetosCustomizadosCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetosCustomizadosCadastroComponent]
    });
    fixture = TestBed.createComponent(ObjetosCustomizadosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
