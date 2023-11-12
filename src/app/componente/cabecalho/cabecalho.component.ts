import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IdentidadeService } from '../identidade/identidade.service';
import { Dialog } from 'primeng/dialog';
import { Renderer2, ElementRef } from '@angular/core';
import { CabecalhoService } from './cabecalho.service';



@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  userEmail: string | null = null;
  displayLogoutDialog: boolean = false;
  notificationCount: number = 0; // ou o número desejado de notificações
  autenticado = false;


  items = [
    {
        label: 'Perfil',
        icon: 'pi pi-user'
    },
    {
        label: 'Configurações',
        icon: 'pi pi-cog',
        command: (event: any) => { this.router.navigate(['../configuracao']); }
    },
    {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: (event: any) => { this.confirmLogout(); }  // Adiciona o comando para executar a função logout
    }
  ];

  userName: string = 'Claire White';
  userRole: string = 'System Admin';
  isProfileMenuVisible: boolean = false;

  @ViewChild('logoutConfirmationDialog')
  logoutConfirmationDialog: Dialog;

  constructor(private router: Router,
              private identidadeService: IdentidadeService,
              private renderer: Renderer2,
              private el: ElementRef,
              private cabecalho: CabecalhoService
              )
              {
                this.logoutConfirmationDialog = {} as Dialog;
              }

  // Função para alternar a visibilidade do menu do perfil
  toggleProfileMenu() {
    this.isProfileMenuVisible = !this.isProfileMenuVisible;
  }

  // Função para lidar com a lógica de logout
  logout() {
    // Sua lógica de logout aqui
  }

  fecharMenuAberto()
  {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target)) {
          this.isProfileMenuVisible = false;
      }
    });
  }

  ngOnInit() {
    this.fecharMenuAberto()
    this.autenticacao();
    if (this.autenticado)
      this.notificacao();
  }
  notificacao() {
    this.cabecalho.QuantidadeNotificacao().subscribe(
      {
        next: (data) => {
          this.notificationCount = data;
        }
      }
    )
  }

  abrirNotificao(){
    this.router.navigate(['../notificacao']);
  }

  autenticacao(){
    this.identidadeService.usuarioAtual.subscribe(usuario => {
      if (usuario && usuario.usuarioToken && usuario.usuarioToken.email)
      {
        const criacaoToekn = usuario.usuarioToken.claims.find(
          (claim: { type: string }) => claim.type === "nbf" // pega a data da claim
        );

        const criacaotimestamp = criacaoToekn.value;

        // Converta o timestamp para uma data JavaScript
        let criacao = new Date(Number(criacaotimestamp) * 1000); // Multiplica por 1000 para converter de segundos para milissegundos


        const expiracaoToekn = usuario.usuarioToken.claims.find(
          (claim: { type: string }) => claim.type === "exp" // pega a data da claim
        );

        const expiracaotimestamp = expiracaoToekn.value;

        // Converta o timestamp para uma data JavaScript
        let expiracao = new Date(Number(expiracaotimestamp) * 1000); // Multiplica por 1000 para converter de segundos para milissegundos

        const agora = new Date();
        agora.setMinutes(agora.getMinutes() + 5);

        if (agora < expiracao && agora > criacao) {
          this.userEmail = usuario.usuarioToken.email;
          this.userName = usuario.usuarioToken.email;
          this.autenticado = true;
        }else
        {
          // O token expirou, então limpe os dados do localStorage
          localStorage.removeItem('usuarioAtual');
          localStorage.setItem('loginTokenExpiradoMessage', 'Sessão expirada, faça login novamente.');
          this.router.navigate(['../login']);
        }
      }
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
      next: (message) => {
        // Navegue para a tela de login após o logout
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // Lide com erros, se necessário
      }
    });

    this.hideLogoutConfirmationDialog();

    // Navegue para a tela de login após o logout
    this.router.navigate(['/login']);
  }
}
