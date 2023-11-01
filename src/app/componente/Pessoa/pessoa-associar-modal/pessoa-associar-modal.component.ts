import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { PessoaService } from '../pessoa.service';
import { PessoasProcessoModel, PessoasProcessoModelImpl } from 'src/app/models/pessoasProcessoModel';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaCompartilhadoService } from '../pessoa-compartilhado.service';

@Component({
  selector: 'app-pessoa-associar-modal',
  templateUrl: './pessoa-associar-modal.component.html',
  styleUrls: ['./pessoa-associar-modal.component.css']
})
export class PessoaAssociarModalComponent {

  processoId: number = 0;
  pessoasProcessoModel!: PessoasProcessoModel[];
  selectedPessoasProcessoModel = new PessoasProcessoModelImpl()

  constructor(
    private pessoaService: PessoaService,
    private processoCompartilhadoService : ProcessoCompartilhadoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private pessoaCompartilhadoService: PessoaCompartilhadoService,
  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }


  ngOnInit() {
      this.listarPessoasAssociar();
  }

  listarPessoasAssociar(){
    this.pessoaService.listarPessoasAssociar(this.processoId).subscribe(
      (pessoasProcessoModel: PessoasProcessoModel[]) => {
        this.pessoasProcessoModel = pessoasProcessoModel
        console.log(this.pessoasProcessoModel)
      }
    )
  }

  fecharModal() {
    // this.displayModal = false;
    // this.close.emit(true);
    this.ref.close();
  }

  salvarPessoaAssociar(pessoa: PessoasProcessoModel){
    this.pessoaService.associar(pessoa, this.processoId).subscribe({
      next: () => {
          this.pessoaCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
          this.fecharModal();
      },
  });
  }
}
