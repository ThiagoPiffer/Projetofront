import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ObjetosCustomizadosListaComponent } from './componente/objetos-customizados/objetos-customizados-lista/objetos-customizados-lista.component';
import { ObjetosCustomizadosCadastroComponent } from './componente/objetos-customizados/objetos-customizados-cadastro/objetos-customizados-cadastro.component';

import { ButtonModule } from 'primeng/button';

import { CabecalhoComponent } from './componente/cabecalho/cabecalho.component';
import { RodapeComponent } from './componente/rodape/rodape.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjetosCustomizadosListaComponent,
    ObjetosCustomizadosCadastroComponent,
    CabecalhoComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
