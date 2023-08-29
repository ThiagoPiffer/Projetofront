
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { ProcessoService } from './../processo.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Processo } from '../../../models/processo';
import { MessageService } from 'primeng/api';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { AbstractControl, ValidatorFn } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { GrupoProcesso } from 'src/app/models/grupoprocesso';


@Component({
  selector: 'app-processo-cadastro-modal',
  templateUrl: './processo-cadastro-modal.component.html',
  styleUrls: ['./processo-cadastro-modal.component.css']
})
export class ProcessoCadastroModalComponent {
  @Input() displayModal = true; // Inicialização padrão
  @Output() close = new EventEmitter<boolean>();

  novoProcesso: Processo = {
    id: 0,
    numero: '',
    dataCadastro: '',
    dataFinal: '',
    descricao: '',
    dataInicio: null,
    dataPrevista: null,
    valorCausa: 0.0,  // Inicializando com 0, mas isso pode ser ajustado conforme a necessidade
    grupoProcessoId: null,
    ativo: false  // Supondo que o valor inicial seja false
  };

  isDataNascimentoValid = true;
  isIdentidadeValid = true;
  processoId: number = 0;
  grupoId: number = 0;

  constructor(private processoService: ProcessoService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private processoCompartilhadoService: ProcessoCompartilhadoService,
              private messageService: MessageService
  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }


  ngOnInit(): void {
    this.carregarProcesso();
  }

  carregarProcesso(){
    if (this.config.data && this.config.data.processoId) {
      this.processoId = this.config.data.processoId;
      this.grupoId = this.config.data.grupoId;
      this.processoService.obterProId(this.processoId).subscribe((processo) => {
        this.novoProcesso = processo;
      });
    }
  }

  fecharModal() {
    this.displayModal = false;
    this.close.emit(true);
    this.ref.close();
  }

  salvar(processo: Processo) {
    processo.dataInicio = processo.dataInicio === '' ? null : processo.dataInicio;
    processo.dataPrevista = processo.dataPrevista === '' ? null : processo.dataPrevista;
    processo.grupoProcessoId = this.grupoId;

    console.log(processo)
    debugger
    if (this.processoId === 0)
    // Chama o serviço para salvar a nova processo
    this.processoService.salvar(processo).subscribe({
        next: () => {
            this.processoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
            this.fecharModal();
        },
    });
    else
      this.processoService.editar(processo).subscribe({
        next: () => {
            this.processoCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
            this.fecharModal();
        },
      });
  }
}

