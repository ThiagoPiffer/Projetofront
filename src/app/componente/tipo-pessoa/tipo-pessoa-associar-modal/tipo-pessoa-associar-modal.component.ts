import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { TipoPessoaService } from '../tipo-pessoa.service';
import { TipoPessoaCompartilhadoService } from '../tipo-pessoa-compartilhado.service';
import { TipoPessoaModel } from 'src/app/models/tipoPessoa';
import { TipoPessoaImpl } from 'src/app/models/tipoPessoa';

@Component({
  selector: 'app-tipo-pessoa-associar-modal',
  templateUrl: './tipo-pessoa-associar-modal.component.html',
  styleUrls: ['./tipo-pessoa-associar-modal.component.css']
})
export class TipoPessoaAssociarModalComponent {

  processoId: number = 0;
  pessoaId: number = 0;
  tipoPessoaModel: TipoPessoaModel[] = []
  selectedTipoPessoaModel = new TipoPessoaImpl()

  constructor(
    private tipoPessoaService: TipoPessoaService,
    private processoCompartilhadoService : ProcessoCompartilhadoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private tipoPessoaCompartilhadoService: TipoPessoaCompartilhadoService,
  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }


  ngOnInit() {
    this.listarTipoPessoasAssociar();
    this.carregaPessoa();
  }

  carregaPessoa(){
    debugger
    if (this.config.data && this.config.data.pessoaId) {
      this.pessoaId = this.config.data.pessoaId;
    }
  }

  listarTipoPessoasAssociar(){
    this.tipoPessoaService.listarTipoPessoasCompleta().subscribe(
      (tipoPessoaModel: TipoPessoaModel[]) => {
        this.tipoPessoaModel = tipoPessoaModel
      }
    )
  }

  fecharModal() {
    // this.displayModal = false;
    // this.close.emit(true);
    this.ref.close();
  }

  salvarTipoPessoaAssociar(tipoPessoa: TipoPessoaModel){
    this.tipoPessoaService.associar(tipoPessoa, this.processoId, this.pessoaId).subscribe({
      next: () => {
          this.tipoPessoaCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
          this.fecharModal();
      },
  });
  }
}
