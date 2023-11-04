import { TipoPessoaCompartilhadoService } from './../tipo-pessoa-compartilhado.service';
import { TipoPessoaService } from './../tipo-pessoa.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoPessoaModel } from 'src/app/models/tipoPessoa';
import { take } from 'rxjs/operators';
import { ArquivoProcessoCompartilhadoService } from '../../arquivo-Processo/arquivo-processo-compartilhado.service';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { TipoPessoaCadastroModalComponent } from '../tipo-pessoa-cadastro-modal/tipo-pessoa-cadastro-modal.component';
import { TipoPessoaAssociarModalComponent } from '../tipo-pessoa-associar-modal/tipo-pessoa-associar-modal.component';

@Component({
  selector: 'app-tipo-pessoa-lista',
  templateUrl: './tipo-pessoa-lista.component.html',
  styleUrls: ['./tipo-pessoa-lista.component.css']
})
export class TipoPessoaListaComponent {
  processoId: number = 0;
  tipoPessoaModel : TipoPessoaModel[] = [];
  @Input() exibeCadastro: boolean = true;
  @Input() exibeAssociar: boolean = false;
  @Input() listaCompleta: boolean = false;
  @Input() listaProcesso: boolean = false;

  constructor(
    private processoCompartilhadoService : ProcessoCompartilhadoService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private arquivoProcessoCompartilhadoService: ArquivoProcessoCompartilhadoService,
    private utilsService: UtilsService,
    private tipoPessoaService: TipoPessoaService,
    private tipoPessoaCompartilhadoService: TipoPessoaCompartilhadoService

  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }
  ngOnInit(): void {
    this.listar()
  }

  listar(){
    switch (true) {
      case this.listaCompleta:
        this.listarTipoPessoasCompleta()
        break;

      case this.listaProcesso:

        this.listarTipoPessoasProcesso()
        break;

      default:
        null
        break;
    }
  }

  editarTipoPessoa(id: number) {
    this.abrirModalCadastroTipoPessoa(id);
  }

  listarTipoPessoasProcesso(){
    this.tipoPessoaService.listarTipoPessoasProcesso(this.processoId).subscribe(
      (tipoPessoaModel: TipoPessoaModel[]) => {
        this.tipoPessoaModel = tipoPessoaModel
      }
    )
  }

  listarTipoPessoasCompleta(){
    this.tipoPessoaService.listarTipoPessoasCompleta().subscribe(
      (tipoPessoaModel: TipoPessoaModel[]) => {
        this.tipoPessoaModel = tipoPessoaModel
      }
    )
  }

  exibirListaTipoPessoa(){
    return this.tipoPessoaModel?.length > 0 ? true : false
  }

  getMenuTipoPessoa(id: number) {
    switch (true) {
      case this.listaCompleta:
        return [
          {
              label: 'Editar',
              icon: 'pi pi-pencil',
              command: () => this.editarTipoPessoa(id)
          },
          {
              label: 'Excluir',
              icon: 'pi pi-times',
              command: () => this.excluirTipoPessoa(id)
          }
        ];

      case this.listaProcesso:
        return [
          {
              label: 'Inserir Tipo',
              icon: 'pi pi-pencil',
              // command: () => this.editarPessoa(id)
          },
          {
              label: 'Desassiciar',
              icon: 'fas fa-user-slash',
              command: () => this.excluirTipoPessoa(id)
          }
        ];

      default:
        return []
        break;
    }
  }

  excluirTipoPessoa(idTipoPessoa: number) {
    switch (true) {
      case this.listaCompleta:
        this.deletarTipoPessoaListaCompleta(idTipoPessoa)
        break;

      case this.listaProcesso:
        this.desassociarTipoPessoaProcesso(idTipoPessoa)
        break;

      default:
        null
        break;
    }

  }

  desassociarTipoPessoaProcesso(idTipoPessoa: number){
    this.tipoPessoaService.desassociarTipoPessoaProcesso(idTipoPessoa, this.processoId).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
          this.listarTipoPessoasProcesso();
      }
   });
  }

  deletarTipoPessoaListaCompleta(id: number){
    this.tipoPessoaService.deletar(id).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
          this.listarTipoPessoasCompleta();
      }
   });
  }

  abrirModalCadastroTipoPessoa(id: number) {
    let ref;
    if (id === 0) {
      ref = this.dialogService.open(TipoPessoaCadastroModalComponent, {
        header: 'Cadastrar Tipo Pessoa',
        width: '35%',
        // data: { pessoaId: id, salvarCadastroExterno: this.salvarCadastroExterno }
      });
    } else {
      ref = this.dialogService.open(TipoPessoaCadastroModalComponent, {
        header: 'Cadastrar Tipo Pessoa',
        width: '35%',
        data: { tipoPessoaId: id}
      });
    }

    ref.onClose.subscribe((result) => {
      this.tipoPessoaCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
        if (mensagem.tipo)
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
        else{
          if(mensagem.mensagem)
          this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
        }

        this.listar()
      });
    });
  }

  abrirModalAssociarPessoa() {
    let ref;

    ref = this.dialogService.open(TipoPessoaAssociarModalComponent, {
      header: 'Associar Pessoa',
      width: '45%',
      height: 'auto',
    });

    ref.onClose.subscribe((result) => {
      this.tipoPessoaCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
        if (mensagem.tipo)
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
        else{
          if(mensagem.mensagem)
          this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
        }

        this.listar()
      });
    });
  }
}
