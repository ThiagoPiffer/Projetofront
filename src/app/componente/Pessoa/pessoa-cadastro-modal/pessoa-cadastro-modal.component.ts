
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { PessoaService } from './../pessoa.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pessoa } from '../../../models/pessoa';
import { MessageService } from 'primeng/api';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';


import { AbstractControl, ValidatorFn } from '@angular/forms';



import { FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { PessoaCompartilhadoService } from '../pessoa-compartilhado.service';


@Component({
  selector: 'app-pessoa-cadastro-modal',
  templateUrl: './pessoa-cadastro-modal.component.html',
  styleUrls: ['./pessoa-cadastro-modal.component.css']
})
export class PessoaCadastroModalComponent {
  @Input() displayModal = true; // Inicialização padrão
  @Output() close = new EventEmitter<boolean>();
  novaPessoa: Pessoa = {
    id: 0,
    nome: '',
    dataNascimento: '',
    idade: 0,
    email: '',
    cpfcnpj: '',
    identidade: '',
    dddTelefone: '',
    telefone: '',
    dddCelular: '',
    celular: '',
    ativo: true
  };

  isDataNascimentoValid = true;
  isIdentidadeValid = true;
  processoId: number = 0;
  pessoaId : number = 0;

  constructor(private pessoaService: PessoaService,
              private processoCompartilhadoService : ProcessoCompartilhadoService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private pessoaCompartilhadoService: PessoaCompartilhadoService,
              private messageService: MessageService
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
    if (this.config.data && this.config.data.pessoaId) {
      this.pessoaId = this.config.data.pessoaId;
      this.pessoaService.obterPorId(this.pessoaId).subscribe((pessoa) => {
        this.novaPessoa = pessoa;
      });
    }
  }

  validateDataNascimento() {
    const value = this.novaPessoa.dataNascimento;
    this.isDataNascimentoValid = !!value && value !== '__/__/____';
  }

  validateIdentidade() {
    const value = this.novaPessoa.identidade;
    this.isIdentidadeValid = !!value && value !== '___.___.___-__';
  }

  updateCPFCNPJ(event: any) {
    const input = event.target as HTMLInputElement;
    this.novaPessoa.cpfcnpj = input.value;
  }


  fecharModal() {
    this.displayModal = false;
    this.close.emit(true);
    this.ref.close();
  }

  cadastrarPessoa() {
    // Implemente aqui a lógica para cadastrar a pessoa
    // Pode ser usando um serviço que faça a chamada à API
    // this.pessoaService.cadastrar(this.novaPessoa);
  }

  salvarPessoaNova(pessoa: Pessoa) {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!pessoa.nome || !pessoa.email || !pessoa.dataNascimento || !pessoa.cpfcnpj || !pessoa.celular || !pessoa.identidade) {
        console.error('Campos obrigatórios não preenchidos.');
        return;
    }

    if (this.pessoaId === 0)
    // Chama o serviço para salvar a nova pessoa
    this.pessoaService.salvar(pessoa, this.processoId).subscribe({
        next: () => {
            this.pessoaCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
            this.fecharModal();
        },
    });
    else
      this.pessoaService.editar(pessoa).subscribe({
        next: () => {
            this.pessoaCompartilhadoService.enviarMensagem(true, 'Cadastro realizado com sucesso');
            this.fecharModal();
        },
      });
  }

}

