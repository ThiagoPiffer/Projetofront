import { ProcessoStatusPersonalizadoCompartilhadoService } from '../processo-status-personalizado-compartilhado.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ProcessoStatusPersonalizadoService } from '../processo-status-personalizado.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProcessoStatusPersonalizadoImpl, ProcessoStatusPersonalizadoModel } from 'src/app/models/processoStatusPersonalizado';


@Component({
  selector: 'app-processo-status-personalizado-cadastro-modal',
  templateUrl: './processo-status-personalizado-cadastro-modal.component.html',
  styleUrls: ['./processo-status-personalizado-cadastro-modal.component.css']
})
export class ProcessoStatusPersonalizadoCadastroModalComponent {
  selectedDate: Date | null = null;
  novoProcessoStatusPersonalizado = new ProcessoStatusPersonalizadoImpl()
  processoId: number = 0;
  processoStatusPersonalizadoId: number = 0;
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
    private processoStatusPersonalizadoService: ProcessoStatusPersonalizadoService,
    private processoStatusPersonalizadoCompartilhadoService: ProcessoStatusPersonalizadoCompartilhadoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.novoProcessoStatusPersonalizado.validaCondicao = false;
    this.carregarProcessoStatusPersonalizado();
  }

  carregarProcessoStatusPersonalizado(){
    if (this.config.data && this.config.data.processoStatusPersonalizadoId) {
      this.processoStatusPersonalizadoId = this.config.data.processoStatusPersonalizadoId;
      this.processoStatusPersonalizadoService.obterPorId(this.processoStatusPersonalizadoId).subscribe((processoStatusPersonalizado) => {
        this.novoProcessoStatusPersonalizado = processoStatusPersonalizado;


        if (this.novoProcessoStatusPersonalizado.maiorQue) {
          this.condicaoSelecionada = 'maiorQue'
        } else if (this.novoProcessoStatusPersonalizado.menorQue) {
          this.condicaoSelecionada = 'menorQue'
        } else if (this.novoProcessoStatusPersonalizado.igualA) {
          this.condicaoSelecionada = 'igualA'
        }

        this.iconeSelecionado = processoStatusPersonalizado.icone;
      });
    }
  }

  fecharModal() {
    // this.displayModal = false;
    // this.close.emit(true);
    this.ref.close();
  }

  onConditionChange(event: any, selectedCondition: string) {
    this.novoProcessoStatusPersonalizado.maiorQue = false;
    this.novoProcessoStatusPersonalizado.menorQue = false;
    this.novoProcessoStatusPersonalizado.igualA = false;

    if (selectedCondition === 'maiorQue') {
      this.novoProcessoStatusPersonalizado.maiorQue = true;
    } else if (selectedCondition === 'menorQue') {
      this.novoProcessoStatusPersonalizado.menorQue = true;
    } else if (selectedCondition === 'igualA') {
      this.novoProcessoStatusPersonalizado.igualA = true;
    }
  }

  salvarProcessoStatusPersonalizadoNovo(processoStatusPersonalizado: ProcessoStatusPersonalizadoModel, iconeSelecionado: any) {
    processoStatusPersonalizado.icone = iconeSelecionado
    // Verifica se os campos obrigatórios estão preenchidos
    if (!processoStatusPersonalizado.descricao) {
        this.messageService.add({ severity: 'warn', summary: 'Sucesso', detail: 'Campos obrigatórios não preenchidos.' });
        return;
    }

    if (this.processoStatusPersonalizadoId === 0){
      // Chama o serviço para salvar a novo tipo pessoa
      this.processoStatusPersonalizadoService.salvar(processoStatusPersonalizado).subscribe({
          next: () => {
              this.processoStatusPersonalizadoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
              this.fecharModal();
          },
      });
    }
    else
    {
      this.processoStatusPersonalizadoService.editar(processoStatusPersonalizado).subscribe({
        next: () => {
            this.processoStatusPersonalizadoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
            this.fecharModal();
        },
      });
    }
  }
}

