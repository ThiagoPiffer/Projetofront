import { EventoCompartilhadoService } from './../evento-compartilhado.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoImpl, EventoModel } from 'src/app/models/evento';
import { MessageService } from 'primeng/api';
import { EventoService } from '../evento.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';

@Component({
  selector: 'app-evento-cadastro-modal',
  templateUrl: './evento-cadastro-modal.component.html',
  styleUrls: ['./evento-cadastro-modal.component.css']
})
export class EventoCadastroModalComponent {
  selectedDate: Date | null = null;
  novoEvento = new EventoImpl()
  processoId: number = 0;
  eventoId: number = 0;

  constructor(
    private messageService: MessageService,
    private eventoService: EventoService,
    private eventoCompartilhadoService: EventoCompartilhadoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private processoCompartilhadoService : ProcessoCompartilhadoService,
  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }

  ngOnInit(): void {
    this.carregarPessoa();
  }

  carregarPessoa(){
    if (this.config.data && this.config.data.eventoId) {
      this.eventoId = this.config.data.eventoId;
      this.eventoService.obterPorId(this.eventoId).subscribe((evento) => {
        this.novoEvento = evento;
      });
    }
  }

  salvarEventoNovo(evento: EventoModel) {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!evento.nome || !evento.descricao || !evento.dataFinal ) {
        this.messageService.add({ severity: 'warn', summary: 'Sucesso', detail: 'Campos obrigatórios não preenchidos.' });
        return;
    }

    evento.processoId = this.processoId
    this.eventoService.salvar(evento).subscribe({
      next: () => {

          this.eventoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
          this.fecharModal();
      },error: (error) => {
      }

    });
  }

  fecharModal() {
    // this.displayModal = false;
    // this.close.emit(true);
    this.ref.close();
  }
}
