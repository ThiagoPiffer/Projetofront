

import { Component, NgModule, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { ProcessoService } from '../processo.service';
import { ArquivoProcessoService } from '../../arquivo-Processo/arquivo-processo.service';

import { saveAs } from 'file-saver';

import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { PessoaService } from '../../Pessoa/pessoa.service';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Router } from '@angular/router';
import { Processo } from 'src/app/models/processo';
import { PessoasProcessoModel } from 'src/app/models/pessoasProcessoModel';
import { ArquivoProcesso } from 'src/app/models/arquivoProcesso';
import { DialogService } from 'primeng/dynamicdialog';
import { PessoaCadastroModalComponent } from '../../Pessoa/pessoa-cadastro-modal/pessoa-cadastro-modal.component';
import { ArquivoProcessoUploadModalComponent } from './../../arquivo-Processo/arquivo-processo-upload-modal/arquivo-processo-upload-modal.component';
import { ArquivoProcessoInserirDescricaoModalComponent } from '../../arquivo-Processo/arquivo-processo-inserir-descricao-modal/arquivo-processo-inserir-descricao-modal.component';

import { ProcessoCompartilhadoService } from '../processo-compartilhado.service';
import { PessoaCompartilhadoService } from '../../Pessoa/pessoa-compartilhado.service';
import { ArquivoProcessoCompartilhadoService } from '../../arquivo-Processo/arquivo-processo-compartilhado.service';


// import { Subject, Observable } from 'rxjs/Rx';
import {BrowserModule} from '@angular/platform-browser'

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild
} from '@angular/animations';
import { ProcessoStatusPersonalizadoImpl, ProcessoStatusPersonalizadoModel } from 'src/app/models/processoStatusPersonalizado';
import { ControlePessoaExternaComponent } from '../../controle-pessoa-externa/controle-pessoa-externa/controle-pessoa-externa.component';
import { ArquivoProcessoTemplateUploadModalComponent } from '../../arquivo-processo-template/arquivo-processo-template-upload-modal/arquivo-processo-template-upload-modal.component';
import { ArquivoProcessoTemplateService } from '../../arquivo-processo-template/arquivo-processo-template.service';
import { ArquivoProcessoTemplate } from 'src/app/models/ArquivoProcessoTemplate';
import { ArquivoProcessoTemplateConfigurarModalComponent } from '../../arquivo-processo-template/arquivo-processo-template-configurar-modal/arquivo-processo-template-configurar-modal.component';


@Component({
  selector: 'app-processo-detalhe',
  templateUrl: './processo-detalhe.component.html',
  styleUrls: ['./processo-detalhe.component.css'],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@easeInOut', animateChild(), { optional: true })
      ])
    ]),
    trigger('easeInOut', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('500ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]

})

export class ProcessoDetalheComponent implements OnInit {
  iconePagina = 'fas fa-balance-scale'
  caminhoPagina = 'Detalhes do Processo'

  processoId: number = 0;
  processo: Processo | any;
  pessoasProcessoModel : PessoasProcessoModel | any;
  arquivosProcesso : ArquivoProcesso | any;
  expanded: boolean = false;
  processoStatusPersonalizado = new ProcessoStatusPersonalizadoImpl();
  visibleModalFinalizarProcesso: boolean = false;
  listaTemplates: ArquivoProcessoTemplate[] = [];

  constructor(
    private processoService: ProcessoService,
    private arquivoProcessoService: ArquivoProcessoService,
    private pessoaService: PessoaService,
    private processoCompartilhadoService : ProcessoCompartilhadoService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private arquivoProcessoCompartilhadoService: ArquivoProcessoCompartilhadoService,
    private pessoaCompartilhadoService: PessoaCompartilhadoService,
    private arquivoProcessoTemplateService: ArquivoProcessoTemplateService,
    private utilsService: UtilsService,
    private router: Router,

    ) {
      this.processoCompartilhadoService.processoId$.subscribe(id => {
        if (id !== null) {
          this.processoId = id;
        }
      });

      this.obterProcesso();
      this.listarPessoasProcesso();
      this.listarArquivosProcesso();
      this.buscarProcessoStatus();
    }

    buscarProcessoStatus(){
      this.processoService.buscarProcessoStatus(this.processoId).subscribe({
        next: (data) =>{
          this.processoStatusPersonalizado = data;
        }
      })
    }


    ngOnInit(): void {
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

    exibeDataFinal(): boolean {
      return this.processo?.dataFinal ? true : false;
    }

    finalizarProcesso(processo: Processo){
      if (!processo.motivoFinal ) {
        this.messageService.add({ severity: 'warn', summary: 'Sucesso', detail: 'Campos obrigatórios não preenchidos.' });
        return;
      }

      this.processoService.finalizar(processo).subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Processo realizado com sucesso.',
            sticky: true
          });

          // Recarregar a página após 10 segundos
          setTimeout(() => {
            this.recarregarPagina();
          }, 2000);
        }
      });
    }

    recarregarPagina(){
      window.location.reload();
    }

    fecharModal() {
      this.visibleModalFinalizarProcesso = false
    }

    toggleExpand() {
      this.expanded = !this.expanded;
    }

    exibirListaPessoa(){
      return this.pessoasProcessoModel?.length > 0 ? true : false
    }

    exibirListaArquivo(){
      return this.arquivosProcesso?.length > 0 ? true : false
    }

    getIconForFile(fileExtension: string): { icon: string, color: string } {
      switch (fileExtension) {
        case 'pdf':
          return { icon: 'fas fa-file-pdf', color: '#eb6b6beb' }; // vermelho
        case 'doc':
        case 'docx':
          return { icon: 'fas fa-file-word', color: '#0d6efdcc' }; // azul
        case 'xls':
        case 'xlsx':
          return { icon: 'fas fa-file-excel', color: '#089708a3' }; // verde
        case 'png':
        case 'jpg':
          return { icon: 'fas fa-file-image', color: '#ffa5009e' }; // laranja
        default:
          return { icon: 'fas fa-file', color: '#808080a3' }; // cinza
      }
    }

  mapaItensMenuTopoProcesso: Map<number, any[]> = new Map();
  obterItensMenuProcesso(){
    if (this.processo)
      return  [
        {
          label: 'Novo Template',
          icon: 'fas fa-object-ungroup',
          command: () => {
            this.NovoTemplate();
          }
        },
        // {
        //   label: 'Cadastro externo Pessoa',
        //   icon: 'fas fa-link',
        //   command: () => {
        //     this.GerarLinkExternoCadastroPessoa();
        //   }
        // },
        {
          label: this.processo.dataFinal ? 'Reabrir Processo' : 'Finalizar Processo',
          icon: 'fas fa-clipboard-check',
          command: () => {
            this.processo.dataFinal ? this.ReabrirProcesso() : this.exibirModalFinalizarProcesso()
          }
        }
      ];
    else
      return [];
  }

  ReabrirProcesso() {
    this.processoService.reabrirProcesso(this.processo).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Processo reaberto.',
          sticky: true
        });

        // Recarregar a página após 2 segundos
        setTimeout(() => {
          this.recarregarPagina();
        }, 2000);
      }
    });
  }

    obterItensMenuTemplate() {
      let items = this.listaTemplates.map(template => ({
        label: template.nome,
        icon: '', // Defina o ícone aqui, se necessário
        command: () => {
          this.ConfiguraArquivoTemplateModal(template);
        }
      }));

      // Adiciona um novo item ao final do array
      items.push({
        label: 'Novo Template',
        icon: 'fas fa-object-ungroup',
        command: () => {
          this.NovoTemplate();
        }
      });

      return items;
    }

    ConfiguraArquivoTemplateModal(arquivo: ArquivoProcessoTemplate) {
      // event.preventDefault();

      const ref = this.dialogService.open(ArquivoProcessoTemplateConfigurarModalComponent, {
        header: 'Configurar Template',
        width: '55%',
        height: '80%',
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

    NovoTemplate(){
      // event.preventDefault();

      const ref = this.dialogService.open(ArquivoProcessoTemplateUploadModalComponent, {
        header: 'Upload Arquivo',
        width: '80%',
        height: '80%'
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

    GerarLinkExternoCadastroPessoa() {
      // event.preventDefault();

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

    exibirModalFinalizarProcesso(){
      this.visibleModalFinalizarProcesso = true;
    }

    DownloadArquivo(arquivo: ArquivoProcesso) {
      this.arquivoProcessoService.DownloadArquivo(arquivo.id).subscribe(data => {
        saveAs(data, arquivo.nomeArquivo);
      });
    }

    getMenuPessoas(id: number) {
      return [
          {
              label: 'Editar',
              icon: 'pi pi-pencil',
              command: () => this.editarPessoa(id)
          },
          {
              label: 'Excluir',
              icon: 'pi pi-times',
              command: () => this.excluirPessoa(id)
          }
      ];
    }

    getMenuArquivos(id: number) {
      return [
          {
              label: 'Editar',
              icon: 'pi pi-pencil',
              command: () => this.inserirDescricaoArquivo(id)
          },
          {
              label: 'Excluir',
              icon: 'pi pi-times',
              command: () => this.excluirArquivo(id)
          }
      ];
    }

    editarPessoa(id: number) {
      this.abrirModalCadastroPessoa(id);
    }

    excluirPessoa(id: number) {
        this.pessoaService.deletar(id).subscribe({
          next: () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
              this.listarPessoasProcesso();
          }
      });
    }

    inserirDescricaoArquivo(id: number) {
      const ref = this.dialogService.open(ArquivoProcessoInserirDescricaoModalComponent, {
        header: 'Upload Arquivo',
        width: '35%'
      });

      ref.onClose.subscribe((result) => {
        this.arquivoProcessoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
          if (mensagem.tipo)
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
          else{
            if(mensagem.mensagem)
              this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
          }

          this.listarArquivosProcesso();
        });
      });
    }

    excluirArquivo(id: number) {
      this.arquivoProcessoService.deletar(id).subscribe({
        next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
            this.listarArquivosProcesso();
        }
      });
    }

    listarPessoasProcesso(){
      this.pessoaService.listarPessoasProcesso(this.processoId).subscribe(
        (pessoasProcessoModel: PessoasProcessoModel[]) => {
          this.pessoasProcessoModel = pessoasProcessoModel
        }
      )
    }

    listarArquivosProcesso(){
      this.arquivoProcessoService.listarArquivosProcesso(this.processoId).subscribe(
        (arquivosProcesso: ArquivoProcesso[]) => {
          this.arquivosProcesso = arquivosProcesso
        }
      )
    }

    toggleDescription(arquivo: any) {
      if (arquivo.showDescription) {
        arquivo.showDescription = false;
      } else {
        arquivo.showDescription = true;
      }
    }

    obterProcesso(){
      this.processoService.obterProId(this.processoId).subscribe(
        (processo: Processo) => {
          this.processo = {
            ...processo,
            // dataInicio: processo.dataInicio ? this.utilsService.formatarData(processo.dataInicio.toString()) : null,
            // dataPrevista: processo.dataPrevista ? this.utilsService.formatarData(processo.dataPrevista.toString()) : null,
            // dataFinal: processo.dataFinal ? this.utilsService.formatarData(processo.dataFinal.toString()) : null,
            valorCausa: processo.valorCausa ?? 0
          };

        }
      );
    }

    abrirModalCadastroPessoa(id: number) {
      let ref;
      if (id === 0) {
        ref = this.dialogService.open(PessoaCadastroModalComponent, {
          header: 'Cadastrar Pessoa',
          width: '35%',
        });
      } else {
        ref = this.dialogService.open(PessoaCadastroModalComponent, {
          header: 'Cadastrar Pessoa',
          width: '35%',
          data: { pessoaId: id }
        });
      }

      ref.onClose.subscribe((result) => {
        this.pessoaCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
          if (mensagem.tipo)
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
          else{
            if(mensagem.mensagem)
            this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
          }

          this.listarPessoasProcesso();
        });
      });
    }


    abrirModalImportarArquivo(){
      const ref = this.dialogService.open(ArquivoProcessoUploadModalComponent, {
        header: 'Upload Arquivo',
        width: '35%'
      });

      ref.onClose.subscribe((result) => {
        this.arquivoProcessoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
          if (mensagem.tipo)
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
          else{
            if(mensagem.mensagem)
              this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
          }

          this.listarArquivosProcesso();
        });
      });
    }

}
