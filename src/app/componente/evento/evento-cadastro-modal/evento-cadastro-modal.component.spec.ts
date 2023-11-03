import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoCadastroModalComponent } from './evento-cadastro-modal.component';

describe('EventoCadastroModalComponent', () => {
  let component: EventoCadastroModalComponent;
  let fixture: ComponentFixture<EventoCadastroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoCadastroModalComponent]
    });
    fixture = TestBed.createComponent(EventoCadastroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
