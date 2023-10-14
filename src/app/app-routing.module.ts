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
import { RegistroComponent } from './componente/identidade/registro/registro.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'objetos-customizados-lista',
    component: ObjetosCustomizadosListaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'objetos-customizados-cadastro',
    component: ObjetosCustomizadosCadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'processo-lista',
    component: ProcessoListaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'processo-detalhe',
    component: ProcessoDetalheComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pessoa-cadastro-modal',
    component: PessoaCadastroModalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
];

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
