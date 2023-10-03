import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ObjetosCustomizadosListaComponent } from './componente/objetos-customizados/objetos-customizados-lista/objetos-customizados-lista.component';
import { ObjetosCustomizadosCadastroComponent } from './componente/objetos-customizados/objetos-customizados-cadastro/objetos-customizados-cadastro.component';
import { ProcessoListaComponent } from './componente/processo/processo-lista/processo-lista.component';
import { ProcessoDetalheComponent } from './componente/processo/processo-detalhe/processo-detalhe.component';
import { PessoaCadastroModalComponent } from './componente/Pessoa/pessoa-cadastro-modal/pessoa-cadastro-modal.component';
import { LoginComponent } from './componente/identidade/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'objetos-customizados-lista',
    component: ObjetosCustomizadosListaComponent
  },
  {
    path: 'objetos-customizados-cadastro',
    component: ObjetosCustomizadosCadastroComponent
  },
  {
    path: 'processo-lista',
    component: ProcessoListaComponent
  },
  {
    path: 'processo-detalhe',
    component: ProcessoDetalheComponent
  },
  {
    path: 'pessoa-cadastro-modal',
    component: PessoaCadastroModalComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
