import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoProcessoTemplateUploadModalComponent } from './arquivo-processo-template-upload-modal.component';

describe('ArquivoProcessoTemplateUploadModalComponent', () => {
  let component: ArquivoProcessoTemplateUploadModalComponent;
  let fixture: ComponentFixture<ArquivoProcessoTemplateUploadModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArquivoProcessoTemplateUploadModalComponent]
    });
    fixture = TestBed.createComponent(ArquivoProcessoTemplateUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
