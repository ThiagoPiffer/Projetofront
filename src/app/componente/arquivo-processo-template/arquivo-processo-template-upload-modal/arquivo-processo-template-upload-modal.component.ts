import { TipoPessoaService } from './../../tipo-pessoa/tipo-pessoa.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { ArquivoProcessoTemplateService } from '../arquivo-processo-template.service';
import { ArquivoProcessoTemplateCompartilhadoService } from '../arquivo-processo-template-compartilhado.service';
import { ArquivoProcessoTemplate } from 'src/app/models/ArquivoProcessoTemplate';
import { TipoPessoaModel } from 'src/app/models/tipoPessoa';
import { TipoPessoaTemplateModel } from 'src/app/models/tipoPessoaTemplateModel';

@Component({
  selector: 'app-arquivo-processo-template-upload-modal',
  templateUrl: './arquivo-processo-template-upload-modal.component.html',
  styleUrls: ['./arquivo-processo-template-upload-modal.component.css']
})
export class ArquivoProcessoTemplateUploadModalComponent implements OnInit  {
  @Input() displayModal = true; // Inicialização padrão
  @Output() close = new EventEmitter<boolean>();
  uploadedFiles: any[] = [];
  maxFileSizeNumber: number = 1000000;
  processoId: number = 0;

  selectedTipoPessoa: any = null;
  tiposSelecionados: any[] = [];
  entradas: any[] = [];
  listaTiposTemplate: TipoPessoaTemplateModel[] = []


  constructor(
    private messageService: MessageService,
    private arquivoProcessoTemplateService : ArquivoProcessoTemplateService,
    private arquivoProcessoTemplateCompartilhadoService: ArquivoProcessoTemplateCompartilhadoService,
    private processoCompartilhadoService : ProcessoCompartilhadoService,
    private TipoPessoaService: TipoPessoaService,
    public ref: DynamicDialogRef,
  ) {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }

  tiposPessoa: TipoPessoaModel[] = []

  ngOnInit(): void {
    this.TipoPessoaService.listarTipoPessoasProcesso(this.processoId).subscribe(
      (tiposPessoa: TipoPessoaModel[]) => {
        this.tiposPessoa = tiposPessoa
      }
    )
  }

  removerTipoPessoa(tipoPessoa: any): void {
    const index1 = this.tiposSelecionados.findIndex(t => t.idPagina === tipoPessoa.idPagina);
    if (index1 !== -1) {
      // Remover o tipo de pessoa da lista
      this.tiposSelecionados.splice(index1, 1);
    }

    const index2 = this.entradas.findIndex(t => t.idPagina === tipoPessoa.idPagina);
    if (index2 !== -1) {
      // Remover o tipo de pessoa da lista
      this.entradas.splice(index2, 1);
    }
  }

  atualizarEntradas(): void {
    this.entradas = this.tiposSelecionados.map(tipo => {
        // Remova espaços e acentos do textoAdicional
        const nomeTipoSemEspaco = tipo.textoAdicional//.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '');

        // construa o objeto entrada com base no tipo e no texto adicional
        return {
            id: tipo.id,
            idPagina: tipo.idPagina,
            descricao: `{{nome${nomeTipoSemEspaco}}}`,
            cpf: `{{cpf${nomeTipoSemEspaco}}}`,
            email: `{{email${nomeTipoSemEspaco}}}`,
            identidade: `{{identidade${nomeTipoSemEspaco}}}`
        };
    });
  }


  removerAcentos(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  incrementarTipoPessoa(event: MouseEvent, tipoPessoa: any): void {
    // Gere um novo ID único, por exemplo, usando o tamanho atual da lista ou outra lógica
    let novoId = this.tiposSelecionados.length + 1; // isso é apenas um exemplo

    // Crie um novo objeto com o novo ID
    const novoTipoPessoa = {
      ...tipoPessoa, // copia todas as propriedades existentes
      idPagina: novoId // atribui um novo ID único
    };

    // Adicione o novo objeto à lista
    this.tiposSelecionados.push(novoTipoPessoa);

    this.entradas.push({
      id: novoTipoPessoa.id,
      idPagina: novoTipoPessoa.idPagina,
      descricao: this.removerAcentos(novoTipoPessoa.descricao + "Nome"),
      cpf: this.removerAcentos(novoTipoPessoa.descricao + "CPF"),
      email: this.removerAcentos(novoTipoPessoa.descricao + "Email"),
      identidade: this.removerAcentos(novoTipoPessoa.descricao + "Identidade"),
    });
    console.log(tipoPessoa)
    console.log(this.tiposSelecionados)
    console.log(this.entradas)
    // Previne que o dropdown seja fechado ao clicar no botão
    event.stopPropagation();
  }


  testEvent() {
    console.log('onBeforeUpload foi acionado!');
  }

  onUpload(event: any) {
    for (let file of event.files) {
      const formData = new FormData();

      formData.append('file', file, file.name);

      console.log(this.tiposSelecionados)
      this.listaTiposTemplate = this.tiposSelecionados.map(tipo => {
        return {
            id: 0,
            ArquivoProcessoTemplateId: 0,
            ProcessoId: 0,
            EmpresaId: 2,
            tipoPessoaId: tipo.id,
            campoChave: tipo.textoAdicional,
            descricao: '',
        };
      });

      this.arquivoProcessoTemplateService.salvar(formData, this.processoId, this.listaTiposTemplate).subscribe({
        next: (data) => {
          this.listaTiposTemplate = this.listaTiposTemplate.map(lista => {
            return {
              id: 0,
              ArquivoProcessoTemplateId: data.id,
              EmpresaId: 0,
              tipoPessoaId: lista.tipoPessoaId,
              campoChave: lista.campoChave,
              descricao: '',
            };
          })

          this.messageService.add({ severity: 'success', summary: 'Cadastro realizado com sucesso', detail: '' });
          this.fecharModal();
        },
        error: erro => {
            console.error('Erro ao salvar o arquivo:', erro);
            // Você pode querer adicionar uma mensagem de erro aqui também
        }
      });
    }

//  this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }


  fecharModal() {
    this.displayModal = false;
    this.close.emit(true);
    this.ref.close();
  }
}

