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
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { CabecalhoComponent } from './componente/cabecalho/cabecalho.component';
import { RodapeComponent } from './componente/rodape/rodape.component';
import { ProcessoListaComponent } from './componente/processo/processo-lista/processo-lista.component';

import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';

import { UtilsService } from './Utils/utils.serive';






@NgModule({
  declarations: [
    AppComponent,
    ObjetosCustomizadosListaComponent,
    ObjetosCustomizadosCadastroComponent,
    CabecalhoComponent,
    RodapeComponent,
    ProcessoListaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    DropdownModule,
    InputMaskModule,
    MenuModule,
    BrowserAnimationsModule,
    DialogModule
  ],
  providers: [UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
