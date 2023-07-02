import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-objetos-customizados-lista',
  templateUrl: './objetos-customizados-lista.component.html',
  styleUrls: ['./objetos-customizados-lista.component.css']
})
export class ObjetosCustomizadosListaComponent {

  constructor(private router: Router) {}

  redirectToTesteComponent() {
    this.router.navigate(['../objetos-customizados']);
  }

  redirectCadastroComponent(){
    this.router.navigate(['../objetos-customizados-cadastro']);
  }
}
