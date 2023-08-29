import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoCadastroModalComponent } from './processo-cadastro-modal.component';

describe('ProcessoCadastroModalComponent', () => {
  let component: ProcessoCadastroModalComponent;
  let fixture: ComponentFixture<ProcessoCadastroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessoCadastroModalComponent]
    });
    fixture = TestBed.createComponent(ProcessoCadastroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
