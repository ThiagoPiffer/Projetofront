import { ControlePessoaExternaComponent } from './../../controle-pessoa-externa/controle-pessoa-externa/controle-pessoa-externa.component';
import { ArquivoProcessoTemplateConfigurarModalComponent } from './../../arquivo-processo-template/arquivo-processo-template-configurar-modal/arquivo-processo-template-configurar-modal.component';
import { ArquivoProcessoTemplate } from './../../../models/ArquivoProcessoTemplate';
import { ArquivoProcessoCompartilhadoService } from './../../arquivo-Processo/arquivo-processo-compartilhado.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from 'src/app/sidebar.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { ArquivoProcessoTemplateUploadModalComponent } from '../../arquivo-processo-template/arquivo-processo-template-upload-modal/arquivo-processo-template-upload-modal.component';
import { ArquivoProcessoTemplateService } from '../../arquivo-processo-template/arquivo-processo-template.service';
import { ProcessoCompartilhadoService } from 'src/app/componente/processo/processo-compartilhado.service';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  mostrarMenuLateral = false;
  mostrarMenuTemplate = false;
  mostrarMenuUtilidades = false;
  mostrarMenuConteudo = false;

  menuExpandido = false; // controla se o menu está expandido ou retraído
  @Output() estadoMenuAlterado = new EventEmitter<boolean>();
  listaTemplates: ArquivoProcessoTemplate[] = [];
  processoId: number = 0;


  constructor(private router: Router,
              private SidebarService: SidebarService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private arquivoProcessoTemplateService: ArquivoProcessoTemplateService,
              private arquivoProcessoCompartilhadoService: ArquivoProcessoCompartilhadoService,
              private processoCompartilhadoService : ProcessoCompartilhadoService,
              private renderer: Renderer2,
              private el: ElementRef
              )
  {
    // Ouvir eventos de roteamento
    this.router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        this.atualizarVisibilidadeMenuLateral(evento.urlAfterRedirects);
      }
    });

    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }

  fecharMenuAberto()
  {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.el.nativeElement.contains(event.target)) {
        this.menuExpandido = false;
      }
    });
  }

  ngOnInit() {
    this.fecharMenuAberto()
    this.listarTemplates();
  }

  listarTemplates() {
    this.arquivoProcessoTemplateService.listar().subscribe(
      {
        next: (data: ArquivoProcessoTemplate[]) => {
          this.listaTemplates = data;
        },
        error: (error) => {
          // trate o erro aqui
        }
      }
    );
  }

  // configurarTemplateModal(template: ArquivoProcessoTemplate) {
  //   this.arquivoProcessoTemplateService.DownloadArquivoTemplate(1)
  // }

  ConfiguraArquivoTemplateModal(event: Event, arquivo: ArquivoProcessoTemplate) {
    event.preventDefault();

    const ref = this.dialogService.open(ArquivoProcessoTemplateConfigurarModalComponent, {
      header: 'Configurar Template',
      width: '55%',
      height: '60%',
      data: {
        arquivoId: arquivo.id,
        processoId: this.processoId,
        arquivoNome: arquivo.nome
      }
    });

    ref.onClose.subscribe((result) => {
      this.arquivoProcessoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
        if (mensagem.tipo)
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });

        else{
          if(mensagem.mensagem)
            this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
        }

        this.listarTemplates()
      });
    });



    // this.arquivoProcessoTemplateService.DownloadArquivoTemplate(arquivo.id).subscribe(data => {
    //   saveAs(data, arquivo.nome);
    // });
  }


  atualizarVisibilidadeMenuLateral(url: string) {
    // Lógica para mostrar ou ocultar o menu lateral com base na URL
    // Por exemplo, se a URL contém 'algum-caminho', mostrar o menu lateral

    switch (true) {
      case url.includes('processo-detalhe'):
        this.mostrarMenuLateral = true;
        this.mostrarMenuConteudo = true;
        this.mostrarMenuTemplate = true;
        this.mostrarMenuUtilidades = true;
        this.SidebarService.toggleSidebar(true);
        break;

      case url.includes('processo-lista'):
        this.mostrarMenuLateral = true;
        this.mostrarMenuConteudo = true;
        this.mostrarMenuTemplate = false;
        this.mostrarMenuUtilidades = true;
        this.SidebarService.toggleSidebar(true);
        break;

      case url.includes('configuracao'):
        this.mostrarMenuLateral = true;
        this.mostrarMenuConteudo = true;
        this.mostrarMenuTemplate = false;
        this.mostrarMenuUtilidades = true;
        this.SidebarService.toggleSidebar(true);
        break;

      case url.includes('pessoa-lista-pagina'):
        this.mostrarMenuLateral = true;
        this.mostrarMenuConteudo = true;
        this.mostrarMenuTemplate = false;
        this.mostrarMenuUtilidades = true;
        this.SidebarService.toggleSidebar(true);
        break;

      case url.includes('notificacao'):
        this.mostrarMenuLateral = true;
        this.mostrarMenuConteudo = true;
        this.mostrarMenuTemplate = false;
        this.mostrarMenuUtilidades = true;
        this.SidebarService.toggleSidebar(true);
        break;

      default:
          this.SidebarService.toggleSidebar(false);
          this.mostrarMenuLateral = false;
          break;
      }
    }

  toggleMenu() {
    this.menuExpandido = !this.menuExpandido;
  }

  GerarLinkExternoCadastroPessoa(event: Event) {
    event.preventDefault();

    const ref = this.dialogService.open(ControlePessoaExternaComponent, {
      header: 'Gerar link externo',
      width: '65%',
      height: '70%'
    });

    // ref.onClose.subscribe((result) => {
    //   this.arquivoProcessoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
    //     if (mensagem.tipo)
    //       this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
    //     else{
    //       if(mensagem.mensagem)
    //         this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
    //     }

    //     this.listarTemplates();
    //   });
    // });
  }

  NovoTemplate(event: Event){
    event.preventDefault();

    const ref = this.dialogService.open(ArquivoProcessoTemplateUploadModalComponent, {
      header: 'Upload Arquivo',
      width: '80%',
      height: '65%'
    });

    ref.onClose.subscribe((result) => {
      this.arquivoProcessoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
        if (mensagem.tipo)
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
        else{
          if(mensagem.mensagem)
            this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
        }

        this.listarTemplates();
      });
    });
  }
}
