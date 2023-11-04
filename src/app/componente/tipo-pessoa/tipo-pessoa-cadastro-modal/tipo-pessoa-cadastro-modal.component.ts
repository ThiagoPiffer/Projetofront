
import { TipoPessoaCompartilhadoService } from '../tipo-pessoa-compartilhado.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoImpl, EventoModel } from 'src/app/models/evento';
import { MessageService } from 'primeng/api';
import { TipoPessoaService } from '../tipo-pessoa.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { TipoPessoaImpl, TipoPessoaModel } from 'src/app/models/tipoPessoa';

@Component({
  selector: 'app-tipo-pessoa-cadastro-modal',
  templateUrl: './tipo-pessoa-cadastro-modal.component.html',
  styleUrls: ['./tipo-pessoa-cadastro-modal.component.css']
})
export class TipoPessoaCadastroModalComponent {
  selectedDate: Date | null = null;
  novoTipoPessoa = new TipoPessoaImpl()
  processoId: number = 0;
  tipoPessoaId: number = 0;

  constructor(
    private messageService: MessageService,
    private tipoPessoaService: TipoPessoaService,
    private tipoPessoaCompartilhadoService: TipoPessoaCompartilhadoService,
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
    if (this.config.data && this.config.data.tipoPessoaId) {
      this.tipoPessoaId = this.config.data.tipoPessoaId;
      this.tipoPessoaService.obterPorId(this.tipoPessoaId).subscribe((tipoPessoa) => {
        this.novoTipoPessoa = tipoPessoa;
      });
    }
  }

  fecharModal() {
    // this.displayModal = false;
    // this.close.emit(true);
    this.ref.close();
  }

  salvarTipoPessoaNovo(tipoPessoa: TipoPessoaModel) {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!tipoPessoa.descricao) {
        this.messageService.add({ severity: 'warn', summary: 'Sucesso', detail: 'Campos obrigatórios não preenchidos.' });
        return;
    }

    if (this.tipoPessoaId === 0){
      // Chama o serviço para salvar a novo tipo pessoa
      this.tipoPessoaService.salvar(tipoPessoa).subscribe({
          next: () => {
              this.tipoPessoaCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
              this.fecharModal();
          },
      });
    }
    else
    {
      this.tipoPessoaService.editar(tipoPessoa).subscribe({
        next: () => {
            this.tipoPessoaCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
            this.fecharModal();
        },
      });
    }
  }

}

