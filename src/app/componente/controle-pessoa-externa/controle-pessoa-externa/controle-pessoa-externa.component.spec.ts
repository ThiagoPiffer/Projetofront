import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlePessoaExternaComponent } from './controle-pessoa-externa.component';

describe('ControlePessoaExternaComponent', () => {
  let component: ControlePessoaExternaComponent;
  let fixture: ComponentFixture<ControlePessoaExternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlePessoaExternaComponent]
    });
    fixture = TestBed.createComponent(ControlePessoaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
