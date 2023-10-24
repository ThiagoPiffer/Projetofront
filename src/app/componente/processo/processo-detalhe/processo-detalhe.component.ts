

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

  processoId: number = 0;
  processo: Processo | any;
  pessoasProcessoModel : PessoasProcessoModel | any;
  arquivosProcesso : ArquivoProcesso | any;
  expanded: boolean = false;

  constructor(private processoService: ProcessoService,
              private arquivoProcessoService: ArquivoProcessoService,
              private pessoaService: PessoaService,
              private processoCompartilhadoService : ProcessoCompartilhadoService,
              private dialogService: DialogService,
              private messageService: MessageService,
              private arquivoProcessoCompartilhadoService: ArquivoProcessoCompartilhadoService,
              private pessoaCompartilhadoService: PessoaCompartilhadoService,
              private utilsService: UtilsService,
              private router: Router

    ) {
      this.processoCompartilhadoService.processoId$.subscribe(id => {
        if (id !== null) {
          this.processoId = id;
        }
      });

      this.obterProcesso();
      this.listarPessoasProcesso();
      this.listarArquivosProcesso();
    }

    ngOnInit(): void {
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
