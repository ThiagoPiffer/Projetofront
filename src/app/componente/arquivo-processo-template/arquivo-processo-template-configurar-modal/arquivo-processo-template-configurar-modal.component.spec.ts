import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoProcessoTemplateConfigurarModalComponent } from './arquivo-processo-template-configurar-modal.component';

describe('ArquivoProcessoTemplateConfigurarModalComponent', () => {
  let component: ArquivoProcessoTemplateConfigurarModalComponent;
  let fixture: ComponentFixture<ArquivoProcessoTemplateConfigurarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArquivoProcessoTemplateConfigurarModalComponent]
    });
    fixture = TestBed.createComponent(ArquivoProcessoTemplateConfigurarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
