import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaAssociarModalComponent } from './pessoa-associar-modal.component';

describe('PessoaAssociarModalComponent', () => {
  let component: PessoaAssociarModalComponent;
  let fixture: ComponentFixture<PessoaAssociarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoaAssociarModalComponent]
    });
    fixture = TestBed.createComponent(PessoaAssociarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
