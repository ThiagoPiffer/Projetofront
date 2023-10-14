import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IdentidadeService } from '../identidade/identidade.service';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  userEmail: string | null = null;
  displayLogoutDialog: boolean = false;

  @ViewChild('logoutConfirmationDialog')
  logoutConfirmationDialog: Dialog;

  constructor(private router: Router,
              private identidadeService: IdentidadeService)
              {
                this.logoutConfirmationDialog = {} as Dialog;
              }

  ngOnInit() {
    this.identidadeService.usuarioAtual.subscribe(usuario => {
      if (usuario && usuario.usuarioToken && usuario.usuarioToken.email)
        this.userEmail = usuario.usuarioToken.email;
      else
        this.userEmail = null;
    });
  }

  redirectCadastroComponent(){
    this.router.navigate(['../objetos-customizados-cadastro']);
  }

  redirectListaComponent(){
    this.router.navigate(['../objetos-customizados-lista']);
  }

  redirectProcessoListaComponent(){
    this.router.navigate(['../processo-lista']);
  }

  redirectLoginComponent(){
    this.router.navigate(['../login']);
  }

  redirectRegistroComponent(){
    this.router.navigate(['../registro']);
  }

  showLogoutConfirmationDialog() {
    this.displayLogoutDialog = true;
  }

  hideLogoutConfirmationDialog() {
    this.displayLogoutDialog = false;
  }

  confirmLogout() {
  // Chame o método de logout do serviço
  this.identidadeService.logout().subscribe({
    next: () => {
      // Navegue para a tela de login após o logout
      this.router.navigate(['/login']);
    },
    error: (error) => {
      // Lide com erros, se necessário
    }
  });
  this.hideLogoutConfirmationDialog();
  }
}
