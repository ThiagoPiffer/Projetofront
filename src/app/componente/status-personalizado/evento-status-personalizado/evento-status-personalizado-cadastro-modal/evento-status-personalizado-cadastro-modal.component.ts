import { EventoStatusPersonalizadoCompartilhadoService } from '../evento-status-personalizado-compartilhado.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoImpl, EventoModel } from 'src/app/models/evento';
import { MessageService, SelectItem } from 'primeng/api';
import { EventoStatusPersonalizadoService } from '../evento-status-personalizado.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventoStatusPersonalizadoImpl, EventoStatusPersonalizadoModel } from 'src/app/models/eventoStatusPersonalizado';


@Component({
  selector: 'app-evento-status-personalizado-cadastro-modal',
  templateUrl: './evento-status-personalizado-cadastro-modal.component.html',
  styleUrls: ['./evento-status-personalizado-cadastro-modal.component.css']
})
export class EventoStatusPersonalizadoCadastroModalComponent {
  selectedDate: Date | null = null;
  novoEventoStatusPersonalizado = new EventoStatusPersonalizadoImpl()
  processoId: number = 0;
  eventoStatusPersonalizadoId: number = 0;
  condicaoSelecionada: string = ''

  // Opções para o selectButton
  stateOptions: SelectItem[] = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false }
  ];

  iconeSelecionado: any;
  opcoesIcones: any[] = [
    {valor: 'pi pi-check-square'},
    {valor: 'pi pi-exclamation-triangle'},
    {valor: 'pi pi-question-circle'}
  ];

  constructor(
    private messageService: MessageService,
    private eventoStatusPersonalizadoService: EventoStatusPersonalizadoService,
    private eventoStatusPersonalizadoCompartilhadoService: EventoStatusPersonalizadoCompartilhadoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.novoEventoStatusPersonalizado.validaCondicao = false;
    this.carregarEventoStatusPersonalizado();
  }

  carregarEventoStatusPersonalizado(){
    if (this.config.data && this.config.data.eventoStatusPersonalizadoId) {
      this.eventoStatusPersonalizadoId = this.config.data.eventoStatusPersonalizadoId;
      this.eventoStatusPersonalizadoService.obterPorId(this.eventoStatusPersonalizadoId).subscribe((eventoStatusPersonalizado) => {
        this.novoEventoStatusPersonalizado = eventoStatusPersonalizado;


        if (this.novoEventoStatusPersonalizado.maiorQue) {
          this.condicaoSelecionada = 'maiorQue'
        } else if (this.novoEventoStatusPersonalizado.menorQue) {
          this.condicaoSelecionada = 'menorQue'
        } else if (this.novoEventoStatusPersonalizado.igualA) {
          this.condicaoSelecionada = 'igualA'
        }

        this.iconeSelecionado = eventoStatusPersonalizado.icone;
      });
    }
  }

  fecharModal() {
    // this.displayModal = false;
    // this.close.emit(true);
    this.ref.close();
  }

  onConditionChange(event: any, selectedCondition: string) {
    this.novoEventoStatusPersonalizado.maiorQue = false;
    this.novoEventoStatusPersonalizado.menorQue = false;
    this.novoEventoStatusPersonalizado.igualA = false;

    if (selectedCondition === 'maiorQue') {
      this.novoEventoStatusPersonalizado.maiorQue = true;
    } else if (selectedCondition === 'menorQue') {
      this.novoEventoStatusPersonalizado.menorQue = true;
    } else if (selectedCondition === 'igualA') {
      this.novoEventoStatusPersonalizado.valorControle = 0;
      this.novoEventoStatusPersonalizado.igualA = true;
    }
  }

  salvarEventoStatusPersonalizadoNovo(eventoStatusPersonalizado: EventoStatusPersonalizadoModel, iconeSelecionado: any) {
    eventoStatusPersonalizado.icone = iconeSelecionado
    // Verifica se os campos obrigatórios estão preenchidos
    if (!eventoStatusPersonalizado.descricao) {
        this.messageService.add({ severity: 'warn', summary: 'Sucesso', detail: 'Campos obrigatórios não preenchidos.' });
        return;
    }

    if (this.eventoStatusPersonalizadoId === 0){
      // Chama o serviço para salvar a novo tipo pessoa
      this.eventoStatusPersonalizadoService.salvar(eventoStatusPersonalizado).subscribe({
          next: () => {
              this.eventoStatusPersonalizadoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
              this.fecharModal();
          },
      });
    }
    else
    {
      this.eventoStatusPersonalizadoService.editar(eventoStatusPersonalizado).subscribe({
        next: () => {
            this.eventoStatusPersonalizadoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
            this.fecharModal();
        },
      });
    }
  }
}

