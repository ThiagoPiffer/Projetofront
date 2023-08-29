import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoProcessoUploadModalComponent } from './arquivo-processo-upload-modal.component';

describe('ArquivoProcessoUploadModalComponent', () => {
  let component: ArquivoProcessoUploadModalComponent;
  let fixture: ComponentFixture<ArquivoProcessoUploadModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArquivoProcessoUploadModalComponent]
    });
    fixture = TestBed.createComponent(ArquivoProcessoUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
