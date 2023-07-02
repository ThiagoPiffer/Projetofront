import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ObjetosCustomizadosListaComponent } from './componente/objetos-customizados/objetos-customizados-lista/objetos-customizados-lista.component';
import { ObjetosCustomizadosCadastroComponent } from './componente/objetos-customizados/objetos-customizados-cadastro/objetos-customizados-cadastro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'objetos-customizados-lista',
    pathMatch: 'full'
  },
  {
    path: 'objetos-customizados-lista',
    component: ObjetosCustomizadosListaComponent
  },
  {
    path: 'objetos-customizados-cadastro',
    component: ObjetosCustomizadosCadastroComponent
  }
];

@NgModule({
  imports: [CommonModule, ButtonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
