import { EventoStatusPersonalizadoService } from './../evento-status-personalizado.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoStatusPersonalizadoModel } from 'src/app/models/eventoStatusPersonalizado';
import { take } from 'rxjs/operators';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';
import { EventoStatusPersonalizadoCadastroModalComponent } from '../evento-status-personalizado-cadastro-modal/evento-status-personalizado-cadastro-modal.component';
import { EventoStatusPersonalizadoCompartilhadoService } from '../evento-status-personalizado-compartilhado.service';

import { ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-evento-status-personalizado-lista',
  templateUrl: './evento-status-personalizado-lista.component.html',
  styleUrls: ['./evento-status-personalizado-lista.component.css'],
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
export class EventoStatusPersonalizadoListaComponent {
  visibleModalExcluir: boolean = false;
  eventoExcluir: number = 0;

  processoId: number = 0;
  eventoStatusPersonalizadoModel : EventoStatusPersonalizadoModel[] = [];
  @Input() exibeCadastro: boolean = true;
  @Input() exibeAssociar: boolean = false;
  @Input() listaCompleta: boolean = false;
  @Input() listaProcesso: boolean = false;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private utilsService: UtilsService,
    private eventoStatusPersonalizadoService: EventoStatusPersonalizadoService,
    private eventoStatusPersonalizadoCompartilhadoService: EventoStatusPersonalizadoCompartilhadoService,
    private confirmationService: ConfirmationService,

  ) { }

  confirmarExclusao(id: number) {
    this.visibleModalExcluir = true;
    this.eventoExcluir = id;
  }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.listarEventoStatusPersonalizadosCompleta()
  }

  editarEventoStatusPersonalizado(id: number) {
    this.abrirModalCadastroEventoStatusPersonalizado(id);
  }

  listarEventoStatusPersonalizadosCompleta(){
    this.eventoStatusPersonalizadoService.listar().subscribe(
      (eventoStatusPersonalizadoModel: EventoStatusPersonalizadoModel[]) => {
        this.eventoStatusPersonalizadoModel = eventoStatusPersonalizadoModel
      }
    )
  }

  exibirListaEventoStatusPersonalizado(){
    return this.eventoStatusPersonalizadoModel?.length > 0 ? true : false
  }

  getMenuEventoStatusPersonalizado(id: number) {
    return [
      {
          label: 'Editar',
          icon: 'pi pi-pencil',
          command: () => this.editarEventoStatusPersonalizado(id)
      },
      {
          label: 'Excluir',
          icon: 'pi pi-times',
          command: () => this.confirmarExclusao(id)//this.excluirEventoStatusPersonalizado(id)
      }
    ];
  }

  excluirEventoStatusPersonalizado(idEventoStatusPersonalizado: number) {
    this.deletarEventoStatusPersonalizadoListaCompleta(idEventoStatusPersonalizado)
  }

  deletarEventoStatusPersonalizadoListaCompleta(id: number){
    this.eventoStatusPersonalizadoService.deletar(id).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
          this.visibleModalExcluir = false
          this.listar();
      }
   });
  }

  abrirModalCadastroEventoStatusPersonalizado(id: number) {
    let ref;
    if (id === 0) {
      ref = this.dialogService.open(EventoStatusPersonalizadoCadastroModalComponent, {
        header: 'Cadastrar Status evento personalizado',
        width: '35%',
        // data: { pessoaId: id, salvarCadastroExterno: this.salvarCadastroExterno }
      });
    } else {
      ref = this.dialogService.open(EventoStatusPersonalizadoCadastroModalComponent, {
        header: 'Editar Status evento personalizado',
        width: '35%',
        data: { eventoStatusPersonalizadoId: id}
      });
    }

    ref.onClose.subscribe((result) => {
      this.eventoStatusPersonalizadoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
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

  adicionarEventoStatusPadrao() {
    this.eventoStatusPersonalizadoService.adicionarStatusPadraoEvento().subscribe(
      {
        next: (data) => {
          this.listar();
        }
      }
    );
  }
}

