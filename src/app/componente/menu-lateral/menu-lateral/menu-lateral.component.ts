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


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  mostrarMenuLateral = false;
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

  ngOnInit() {
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
      width: '35%',
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
      });
    });



    // this.arquivoProcessoTemplateService.DownloadArquivoTemplate(arquivo.id).subscribe(data => {
    //   saveAs(data, arquivo.nome);
    // });
  }


  atualizarVisibilidadeMenuLateral(url: string) {
    // Lógica para mostrar ou ocultar o menu lateral com base na URL
    // Por exemplo, se a URL contém 'algum-caminho', mostrar o menu lateral
    if (url.includes('processo-detalhe')) {
      this.mostrarMenuLateral = true;
      this.SidebarService.toggleSidebar(true);
    } else {
      this.SidebarService.toggleSidebar(false);
      this.mostrarMenuLateral = false;
    }
  }

  toggleMenu() {
    this.menuExpandido = !this.menuExpandido;
  }

  metodoRelatorio1(event: Event) {
    event.preventDefault();
    // seu código para lidar com o clique aqui
  }

  NovoTemplate(event: Event){
    event.preventDefault();

    const ref = this.dialogService.open(ArquivoProcessoTemplateUploadModalComponent, {
      header: 'Upload Arquivo',
      width: '65%'
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
