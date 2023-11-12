import { ProcessoStatusPersonalizadoService } from './../processo-status-personalizado.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessoStatusPersonalizadoModel } from 'src/app/models/processoStatusPersonalizado';
import { take } from 'rxjs/operators';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { ProcessoStatusPersonalizadoCadastroModalComponent } from '../processo-status-personalizado-cadastro-modal/processo-status-personalizado-cadastro-modal.component';
import { ProcessoStatusPersonalizadoCompartilhadoService } from '../processo-status-personalizado-compartilhado.service';


@Component({
  selector: 'app-processo-status-personalizado-lista',
  templateUrl: './processo-status-personalizado-lista.component.html',
  styleUrls: ['./processo-status-personalizado-lista.component.css'],
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
export class ProcessoStatusPersonalizadoListaComponent {
  visibleModalExcluir: boolean = false;
  processoExcluir: number = 0;

  processoId: number = 0;
  processoStatusPersonalizadoModel : ProcessoStatusPersonalizadoModel[] = [];
  @Input() exibeCadastro: boolean = true;
  @Input() exibeAssociar: boolean = false;
  @Input() listaCompleta: boolean = false;
  @Input() listaProcesso: boolean = false;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private processoStatusPersonalizadoService: ProcessoStatusPersonalizadoService,
    private processoStatusPersonalizadoCompartilhadoService: ProcessoStatusPersonalizadoCompartilhadoService,

  ) { }

  confirmarExclusao(id: number) {
    this.visibleModalExcluir = true;
    this.processoExcluir = id;
  }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.listarProcessoStatusPersonalizadosCompleta()
  }

  editarProcessoStatusPersonalizado(id: number) {
    this.abrirModalCadastroProcessoStatusPersonalizado(id);
  }

  listarProcessoStatusPersonalizadosCompleta(){
    this.processoStatusPersonalizadoService.listar().subscribe(
      (processoStatusPersonalizadoModel: ProcessoStatusPersonalizadoModel[]) => {
        this.processoStatusPersonalizadoModel = processoStatusPersonalizadoModel
      }
    )
  }

  exibirListaProcessoStatusPersonalizado(){
    return this.processoStatusPersonalizadoModel?.length > 0 ? true : false
  }

  getMenuProcessoStatusPersonalizado(id: number) {
    return [
      {
          label: 'Editar',
          icon: 'pi pi-pencil',
          command: () => this.editarProcessoStatusPersonalizado(id)
      },
      {
          label: 'Excluir',
          icon: 'pi pi-times',
          command: () => this.confirmarExclusao(id)
      }
    ];
  }

  excluirProcessoStatusPersonalizado(idProcessoStatusPersonalizado: number) {
    this.deletarProcessoStatusPersonalizadoListaCompleta(idProcessoStatusPersonalizado)
  }

  deletarProcessoStatusPersonalizadoListaCompleta(id: number){
    this.processoStatusPersonalizadoService.deletar(id).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
          this.visibleModalExcluir = false
          this.listar();
      }
   });
  }

  abrirModalCadastroProcessoStatusPersonalizado(id: number) {
    let ref;
    if (id === 0) {
      ref = this.dialogService.open(ProcessoStatusPersonalizadoCadastroModalComponent, {
        header: 'Cadastrar Status processo personalizado',
        width: '55%',
        // data: { pessoaId: id, salvarCadastroExterno: this.salvarCadastroExterno }
      });
    } else {
      ref = this.dialogService.open(ProcessoStatusPersonalizadoCadastroModalComponent, {
        header: 'Editar Status processo personalizado',
        width: '55%',
        data: { processoStatusPersonalizadoId: id}
      });
    }

    ref.onClose.subscribe((result) => {
      this.processoStatusPersonalizadoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
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

  adicionarProcessoStatusPadrao(){
    this.processoStatusPersonalizadoService.adicionarStatusPadraoProcesso().subscribe(
      {
        next: (data) => {
          this.listar();
        }
      }
    );
  }
}

