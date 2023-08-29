import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ArquivoProcessoService } from '../arquivo-processo.service';

@Component({
  selector: 'app-arquivo-processo-inserir-descricao-modal',
  templateUrl: './arquivo-processo-inserir-descricao-modal.component.html',
  styleUrls: ['./arquivo-processo-inserir-descricao-modal.component.css']
})
export class ArquivoProcessoInserirDescricaoModalComponent {
  descricaoForm: FormGroup;
  @Input() displayModal = true;
  @Output() close = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private arquivoProcessoService: ArquivoProcessoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.descricaoForm = this.fb.group({
      descricao: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  fecharModal() {
    this.displayModal = false;
    this.close.emit(true);
    this.ref.close();
  }

  salvar() {
    if (this.descricaoForm.valid) {
      const descricao = this.descricaoForm.get('descricao')?.value;
      const arquivoId = this.config.data.arquivoId;

      this.arquivoProcessoService.editarDescricao(arquivoId, descricao).subscribe()

      this.ref.close(descricao);
    }
  }
}




