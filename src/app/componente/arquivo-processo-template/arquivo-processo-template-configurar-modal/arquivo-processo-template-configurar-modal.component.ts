import { TipoPessoaTemplateService } from './../../tipo-pessoa-template/tipo-pessoa-template.service';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../Pessoa/pessoa.service';
import { PessoasProcessoModel } from 'src/app/models/pessoasProcessoModel';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';
import { ArquivoProcessoTemplateService } from '../../arquivo-processo-template/arquivo-processo-template.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { saveAs } from 'file-saver';
import { TipoPessoaTemplateModel } from 'src/app/models/tipoPessoaTemplateModel';

@Component({
  selector: 'app-arquivo-processo-template-configurar-modal',
  templateUrl: './arquivo-processo-template-configurar-modal.component.html',
  styleUrls: ['./arquivo-processo-template-configurar-modal.component.css']
})
export class ArquivoProcessoTemplateConfigurarModalComponent implements OnInit {
  pessoas: PessoasProcessoModel[] = [];
  selectedPessoaId: number | null = null; // Armazena o ID da pessoa selecionada
  selectedPessoaIds: { [key: number]: any } = {};
  processoId: number = 0;
  selectedPessoa: any = null; // este será o objeto de pessoa inteiro
  idArquivoTemplate = this.getIdArquivoTemplate();
  pessoaTemplate: PessoasProcessoModel[] = [];
  exibeAnonimo = true

  tiposPessoaTemplate: TipoPessoaTemplateModel[] = []
  tipoPessoaTemplateAnonimo: TipoPessoaTemplateModel[] = [
    {
      id: 0,
      idTipoPessoa: 0,
      idEmpresa: 0,
      idArquivoProcessoTemplate: 0,
      campoChave: '',
      descricao: ''
    }
  ]

  constructor(
    private pessoaService: PessoaService,
    private processoCompartilhadoService : ProcessoCompartilhadoService,
    public config: DynamicDialogConfig,
    private arquivoProcessoTemplateService: ArquivoProcessoTemplateService,
    private tipoPessoaTemplateService: TipoPessoaTemplateService
    )
  {
    this.processoCompartilhadoService.processoId$.subscribe(id => {
      if (id !== null) {
        this.processoId = id;
      }
    });
  }

  ngOnInit(): void {
    this.listarPessoasTemplate()
    this.carregarConfiguracaoTemplate()
  }

  getIdArquivoTemplate(): number{
    if (this.config.data && this.config.data.arquivoId)
      return this.config.data.arquivoId;
    return 0;
  }

  getIdProcesso(): number{
    if (this.config.data && this.config.data.processoId)
      return this.config.data.processoId;
    return 0;
  }

  carregarConfiguracaoTemplate(){
    this.arquivoProcessoTemplateService.listarTiposPessoaTemplate(this.idArquivoTemplate).subscribe({
      next:(tiposPessoaTemplate) => {
        if (tiposPessoaTemplate.length > 0)
        {
          this.tiposPessoaTemplate = tiposPessoaTemplate
          this.exibeAnonimo = false;
        }
        else
        {
          this.tiposPessoaTemplate = this.tipoPessoaTemplateAnonimo;
          this.exibeAnonimo = true;
        }
      }
    })
  }

  listarPessoasTemplate(){
    //primeiro busca tipos possiveis para o template
    this.arquivoProcessoTemplateService.ListarPessoaTemplate(this.idArquivoTemplate, this.processoId).subscribe(
      {
        next: (pessoaTemplate) =>{
            this.pessoaTemplate = pessoaTemplate
        },
        error: (error) => {
          console.error('Houve um erro ao buscar as pessoas:', error);
        }
      }
    )
  }

  pessoaTemplateFiltrado(idTipo: number) : PessoasProcessoModel[] {
    let lista = this.pessoaTemplate.filter(o => o.idTipoPessoa === idTipo);
    return lista;
  }

  //busca pessoas filtradas pelo tipo
  listarPessoaProcessoFiltro(tiposPessoaTemplate: TipoPessoaTemplateModel[]){
    this.arquivoProcessoTemplateService.listarPessoasArquivoTemplate(this.processoId, tiposPessoaTemplate).subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
      },
      error: (error) => {
        console.error('Houve um erro ao buscar as pessoas:', error);
      }
    });
  }

  onPessoaChange(event: any, tipoId: number): void {
    const selectedPessoa = this.pessoaTemplate.find(p => p.id === event.value);
    if (selectedPessoa) {
      this.selectedPessoaIds[tipoId] = selectedPessoa; // armazena o objeto pessoa inteiro
    }
  }

  formatCampoChaveNome(campoChave: string): string {
    if (campoChave)
      return `{{nome${campoChave}}}`;
    else
      return ``;
  }

  formatCampoChaveEmail(campoChave: string): string {
    if (campoChave)
      return `{{email${campoChave}}}`;
    else
      return ``;
  }
  formatCampoChaveIdentidade(campoChave: string): string {
    if (campoChave)
      return `{{identidade${campoChave}}}`;
    else
      return ``;
  }
  formatCampoChaveDataNascimento(campoChave: string): string {
    if (campoChave)
      return `{{nascimento${campoChave}}}`;
    else
      return ``;
  }
  formatCampoChaveTelefone(campoChave: string): string {
    if (campoChave)
      return `{{telefone${campoChave}}}`;
    else
      return ``;
  }
  formatCampoChaveCelular(campoChave: string): string {
    if (campoChave)
      return `{{celular${campoChave}}}`;
    else
      return ``;
  }

  gerarDocumento() {
    let configuraDocumento = {
      listaPessoa: this.selectedPessoaIds,
      listaTipos: this.tiposPessoaTemplate,
      idArquivoTemplate: this.idArquivoTemplate
    }

    console.log(configuraDocumento)

    this.arquivoProcessoTemplateService.DownloadArquivoTemplate(configuraDocumento).subscribe(data => {
      saveAs(data, this.config.data.arquivoNome);
    });
  }
}

