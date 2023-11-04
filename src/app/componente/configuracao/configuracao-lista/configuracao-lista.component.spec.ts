import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoListaComponent } from './configuracao-lista.component';

describe('ConfiguracaoListaComponent', () => {
  let component: ConfiguracaoListaComponent;
  let fixture: ComponentFixture<ConfiguracaoListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracaoListaComponent]
    });
    fixture = TestBed.createComponent(ConfiguracaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
