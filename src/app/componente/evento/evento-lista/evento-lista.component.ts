import { EventoService } from '../evento.service';
import { Component, Input, OnInit  } from '@angular/core';
import { EventoModel, EventoImpl } from 'src/app/models/evento';
import { EventoCadastroModalComponent } from '../evento-cadastro-modal/evento-cadastro-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EventoCompartilhadoService } from '../evento-compartilhado.service';
import { take } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { EventoStatusPersonalizadoImpl, EventoStatusPersonalizadoModel } from 'src/app/models/eventoStatusPersonalizado';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})
export class EventoListaComponent implements OnInit {
  @Input() exibeCadastro: boolean = true;

  eventos: EventoModel[] = [];
  processoId: number = 0;
  exibeEncerrados = false;

  eventoStatusPersonalizado = new EventoStatusPersonalizadoImpl();

  constructor(
    private eventoService: EventoService,
    private dialogService: DialogService,
    private eventoCompartilhadoService: EventoCompartilhadoService,
    private messageService: MessageService,
    private processoCompartilhadoService: ProcessoCompartilhadoService,
  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }

  ngOnInit(): void {
    this.listarEventos();
  }

  listarEventos(){
    this.eventoService.listar(this.processoId, this.exibeEncerrados).subscribe(
      {
        next: (data) => {
          this.eventos = data;
        }
      }
    )
  }

  listarEncerradosToggle(){
    this.exibeEncerrados = !this.exibeEncerrados
    this.listarEventos();
  }

  exibirListaEvento(){
    return this.eventos?.length > 0 ? true : false
  }

  editarEvento(id: number) {
    this.abrirModalCadastroEvento(id);
  }

  abrirModalCadastroEvento(id: number) {
    let ref;
    if (id === 0) {
      ref = this.dialogService.open(EventoCadastroModalComponent, {
        header: 'Cadastrar Evento',
        width: '35%',
        // data: { pessoaId: id, salvarCadastroExterno: this.salvarCadastroExterno }
      });
    } else {
      ref = this.dialogService.open(EventoCadastroModalComponent, {
        header: 'Cadastrar Evento',
        width: '35%',
        data: { eventoId: id }
      });
    }

    ref.onClose.subscribe((result) => {
      this.eventoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
        if (mensagem.tipo)
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
        else{
          if(mensagem.mensagem)
          this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
        }

        this.listarEventos();
      });
    });
  }

  excluirEvento(idEvento: number) {
    this.eventoService.deletar(idEvento).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo realizado com sucesso' });
          this.listarEventos();
      }
   });
  }

  buscareventoStatusPersonalizado(idEvento: number){
    this.eventoService.buscarEventoStatus(idEvento).subscribe({
      next: (data) => {
        this.eventoStatusPersonalizado = data;
      }
    })
  }

  getMenuEventos(evento: EventoModel){
    return [
      {
        label: evento.encerrado ? 'Reabrir Evento' : 'Finalizar Evento',
        icon: 'fas fa-clipboard-check',
        command: () => {
          evento.encerrado ? this.reabrirEvento(evento) : this.finalizarEvento(evento)
        }
      },
      {
          label: 'Editar',
          icon: 'pi pi-pencil',
          command: () => this.editarEvento(evento.id)
      },
      {
          label: 'Excluir',
          icon: 'pi pi-times',
          command: () => this.excluirEvento(evento.id)
      }
    ];
  }

  reabrirEvento(evento: EventoModel) {
    this.eventoService.reabrirEvento(evento).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Evento reaberto.',
          sticky: true
        });

        // Recarregar a página após 2 segundos
        setTimeout(() => {
          this.recarregarPagina();
        }, 2000);
      }
    });
  }

  finalizarEvento(evento: EventoModel) {
    this.eventoService.finalizarEvento(evento).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Evento finalizado.',
          sticky: true
        });

        // Recarregar a página após 2 segundos
        setTimeout(() => {
          this.recarregarPagina();
        }, 2000);
      }
    });
  }

  recarregarPagina(){
    window.location.reload();
  }
}
