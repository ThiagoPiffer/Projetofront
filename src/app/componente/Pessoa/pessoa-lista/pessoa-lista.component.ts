import { Component, Input, OnInit  } from '@angular/core';
import { PessoaCadastroModalComponent } from '../pessoa-cadastro-modal/pessoa-cadastro-modal.component';
import { PessoasProcessoModel } from 'src/app/models/pessoasProcessoModel';
import { take } from 'rxjs/operators';
import { ArquivoProcessoCompartilhadoService } from '../../arquivo-Processo/arquivo-processo-compartilhado.service';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { PessoaService } from '../pessoa.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PessoaCompartilhadoService } from '../pessoa-compartilhado.service';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { PessoaAssociarModalComponent } from '../pessoa-associar-modal/pessoa-associar-modal.component';
import { TipoPessoaAssociarModalComponent } from '../../tipo-pessoa/tipo-pessoa-associar-modal/tipo-pessoa-associar-modal.component';

@Component({
  selector: 'app-pessoa-lista',
  templateUrl: './pessoa-lista.component.html',
  styleUrls: ['./pessoa-lista.component.css'],
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
export class PessoaListaComponent implements OnInit {

  processoId: number = 0;
  pessoasProcessoModel : PessoasProcessoModel[] = [];
  @Input() exibeCadastro: boolean = true;
  @Input() exibeAssociar: boolean = false;
  @Input() salvarCadastroExterno: boolean = false;
  @Input() listaCompleta: boolean = false;
  @Input() listaProcesso: boolean = false;
  @Input() listaNotificacao: boolean = false;

  constructor(
    private pessoaService: PessoaService,
    private processoCompartilhadoService : ProcessoCompartilhadoService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private arquivoProcessoCompartilhadoService: ArquivoProcessoCompartilhadoService,
    private pessoaCompartilhadoService: PessoaCompartilhadoService,
    private utilsService: UtilsService,

  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });

  // this.obterProcesso();
  // this.listarArquivosProcesso();
  }
  ngOnInit(): void {
    this.listar()
  }

  listar(){
    switch (true) {
      case this.listaCompleta:
        this.listarPessoasCompleta()
        break;

      case this.listaNotificacao:
        this.listasPessoasExternas()
        break;

      case this.listaProcesso:

        this.listarPessoasProcesso()
        break;

      default:
        null
        break;
    }
  }

  listasPessoasExternas() {
    this.pessoaService.listarPessoasExternas().subscribe(
      (pessoasProcessoModel: PessoasProcessoModel[]) => {
        this.pessoasProcessoModel = pessoasProcessoModel
      }
    )
  }

  editarPessoa(id: number) {
    this.abrirModalCadastroPessoa(id);
  }

  listarPessoasProcesso(){
    this.pessoaService.listarPessoasProcesso(this.processoId).subscribe(
      (pessoasProcessoModel: PessoasProcessoModel[]) => {
        this.pessoasProcessoModel = pessoasProcessoModel
      }
    )
  }

  listarPessoasCompleta(){
    this.pessoaService.listarPessoasCompleta().subscribe(
      (pessoasProcessoModel: PessoasProcessoModel[]) => {
        this.pessoasProcessoModel = pessoasProcessoModel
      }
    )
  }

  exibirListaPessoa(){
    return this.pessoasProcessoModel?.length > 0 ? true : false
  }

  getMenuPessoas(id: number) {
    switch (true) {
      case this.listaCompleta:
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

      case this.listaNotificacao:
        return [
          {
              label: 'Verificar cadastro',
              icon: 'pi pi-pencil',
              command: () => this.editarPessoa(id)
          },
          {
              label: 'Excluir',
              icon: 'pi pi-times',
              command: () => this.excluirPessoa(id)
          }
        ];

      case this.listaProcesso:
        return [
          {
              label: 'Inserir Tipo',
              icon: 'pi pi-pencil',
              command: () => this.inserirTipoPessoa(id)
          },
          {
              label: 'Desassiciar',
              icon: 'fas fa-user-slash',
              command: () => this.excluirPessoa(id)
          }
        ];

      default:
        return []
        break;
    }
  }

  inserirTipoPessoa(pessoaId: number){
    let ref;
    ref = this.dialogService.open(TipoPessoaAssociarModalComponent, {
      header: 'Associar Tipo Pessoa',
      width: '35%',
      data: { pessoaId: pessoaId }
    });

    ref.onClose.subscribe((result) => {
      this.pessoaCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
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

  excluirPessoa(idPessoa: number) {
    switch (true) {
      case this.listaCompleta:
        this.deletarPessoaListaCompleta(idPessoa)
        break;

      case this.listaNotificacao:
        this.deletarPessoaListaCompleta(idPessoa)
        break;

      case this.listaProcesso:
        this.desassociarPessoaProcesso(idPessoa)
        break;

      default:
        null
        break;
    }

  }

  desassociarPessoaProcesso(idPessoa: number){
    this.pessoaService.desassociarPessoaProcesso(idPessoa, this.processoId).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
          this.listarPessoasProcesso();
      }
   });
  }

  deletarPessoaListaCompleta(id: number){
    this.pessoaService.deletar(id).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
          this.listarPessoasCompleta();
      }
   });
  }

  abrirModalCadastroPessoa(id: number) {
    let ref;
    if (id === 0) {
      ref = this.dialogService.open(PessoaCadastroModalComponent, {
        header: 'Cadastrar Pessoa',
        width: '35%',
        data: { pessoaId: id, salvarCadastroExterno: this.salvarCadastroExterno }
      });
    } else {
      ref = this.dialogService.open(PessoaCadastroModalComponent, {
        header: 'Cadastrar Pessoa',
        width: '35%',
        data: { pessoaId: id, salvarCadastroExterno: this.salvarCadastroExterno }
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

        this.listar()
      });
    });
  }

  abrirModalAssociarPessoa() {
    let ref;

    ref = this.dialogService.open(PessoaAssociarModalComponent, {
      header: 'Associar Pessoa',
      width: '45%',
      height: 'auto',
    });

    ref.onClose.subscribe((result) => {
      this.pessoaCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
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
