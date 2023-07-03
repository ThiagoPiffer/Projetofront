import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  constructor(private router: Router) {}

  redirectCadastroComponent(){
    this.router.navigate(['../objetos-customizados-cadastro']);
  }

  redirectListaComponent(){
    this.router.navigate(['../objetos-customizados-lista']);
  }
}
