import { GrupoProcesso } from './../../../models/grupoprocesso';
import { Processo, ProcessoImpl } from '../../../models/processo';
import { GrupoProcessoModel } from 'src/app/models/grupoprocessoModel';
import { ProcessoCadastroModalComponent } from '../processo-cadastro-modal/processo-cadastro-modal.component';

import { take } from 'rxjs/operators';

import { ProcessoService } from '../processo.service';
import { GrupoprocessoService } from  '../grupoprocesso.service';
import { ProcessoCompartilhadoService } from '../processo-compartilhado.service';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren,  } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { UtilsService } from 'src/app/Utils/utils.serive';

import { Router } from '@angular/router';

import { DialogService } from 'primeng/dynamicdialog';

import { ChangeDetectorRef } from '@angular/core';
import { Table } from 'primeng/table';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-processo-lista',
  templateUrl: './processo-lista.component.html',
  styleUrls: ['./processo-lista.component.css'],
  providers: [MessageService],
  styles: [`
      :host ::ng-deep .p-cell-editing {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
      }
  `]
})

export class ProcessoListaComponent implements OnInit {
  iconePagina = 'fas fa-balance-scale'
  caminhoPagina = 'Lista de Processos'

  listaGrupos: GrupoProcessoModel[] = [];
  // listaGruposItem: Record<string, Processo[]>[] = [{
  //   "Grupo 1": [
  //     {
  //       id: 1,
  //       numero: "P001",
  //       descricao: "Processo 1",
  //       dataCadastro: "2023-08-05",
  //       dataInicio: "2023-08-10",
  //       dataPrevista: "2023-09-15",
  //       dataFinal: null,
  //       valorCausa: 1000,

  //       ativo: true,
  //     }
  //   ],
  // }];

  editingIndex: number | null = null;
  editingNewGroup: boolean | null = null;
  listaProcessos: Processo[] = [];

  mapaItensMenuProcesso: Map<number, any[]> = new Map();
  mapaItensMenuGrupoProcesso: Map<number, any[]> = new Map();

  paginaAtual = 1;
  filtro: string = '';
  favoritos: boolean = false;

  visibleModalExcluirProcesso: boolean = false;
  visibleModalExcluirGrupoProcesso: boolean = false;

  grupoAntigo: GrupoProcesso = {
    id: 0,
    nome: '',
    posicao: 0,
    ativo: true
  };

  grupoNovo: GrupoProcesso = {
    id: 0,
    nome: '',
    posicao: 0,
    ativo: true
  };

  processoAntigo = new ProcessoImpl();
  // processoAntigo: Processo = {
  //   id: 0,
  //   numero: '',
  //   descricao: '',
  //   dataCadastro: '',
  //   dataFinal: '',
  //   dataInicio: null,
  //   dataPrevista: null,
  //   valorCausa: 0,
  //   grupoProcessoId: null,
  //   ativo: true,
  // };

  novoProcesso = new ProcessoImpl();
  // novoProcesso: Processo = {
  //   id: 0,
  //   numero: '',
  //   descricao: '',
  //   dataCadastro: '',
  //   dataFinal: '',
  //   dataInicio: null,
  //   dataPrevista: null,
  //   valorCausa: 0,
  //   grupoProcessoId: null,
  //   ativo: true,
  // };

  items: MenuItem[] | undefined;
  novoProcessos: Processo[] = [];
  processoExcluir: Processo | null = null;
  grupoProcessoExcluir: GrupoProcesso | null = null;

  editando: boolean = false;
  @ViewChild('dt', { static: false }) dataTable: Table | undefined;
  exibeEncerrados = false;

  formGroup = new FormGroup({
    cbExibeEncerrados: new FormControl('')
  });


  constructor(private processoService: ProcessoService,
              private grupoprocessoService: GrupoprocessoService,
              private processoCompartilhadoService : ProcessoCompartilhadoService,
              private messageService: MessageService,
              private utilsService: UtilsService,
              private dialogService: DialogService,
              private router: Router,
              private renderer: Renderer2,
              private el: ElementRef

              ) { }

  ngOnInit(): void {
    // this.listarProcessos();
    this.listarGrupoProcesso();


    // this.items = [
    //   {
    //       label: 'Detalhes',
    //       icon: 'pi pi-external-link',
    //       url: 'http://angular.io',
    //       command: () => {
    //         this.detalhes();
    //     }
    //   },
    //   {
    //     label: 'Deletar',
    //     icon: 'pi pi-times',
    //     command: () => {
    //         this.delete();
    //     }
    //   }
    // ];
  }

  exibirModalExcluirProcesso(processo: Processo) {
    this.visibleModalExcluirProcesso = true;
    this.processoExcluir = processo;
  }

  listarEncerradosToggle(){
    this.exibeEncerrados = !this.exibeEncerrados
    this.listarGrupoProcesso();
  }

  exibirModalExcluirGrupoProcesso(grupoProcesso: GrupoProcesso) {
    this.visibleModalExcluirGrupoProcesso = true;
    this.grupoProcessoExcluir = grupoProcesso;
  }

  exibirDetable(processo: Processo) {
    this.processoCompartilhadoService.setProcessoId(processo.id);
    this.router.navigate(['../processo-detalhe']); // Navegação para o componente destino
  }

  deleteProcesso() {
    this.processoService.deletar(this.processoExcluir!).subscribe({
      next: () => {
        this.listarGrupoProcesso();
        this.visibleModalExcluirProcesso = false
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Processo excluído' });
      },
      error: err => {
        console.error('Erro ao excluir o processo:', err);
      }
    });
  }

  deleteGrupoProcesso() {
    this.grupoprocessoService.deletar(this.grupoProcessoExcluir!).subscribe({
      next: () => {
        this.listarGrupoProcesso();
        this.visibleModalExcluirGrupoProcesso = false
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Grupo processo excluído' });
      },
      error: err => {
        console.error('Erro ao excluir o processo:', err);
      }
    });
  }

  converteParaDate(data: string | null): Date | null {
    return data ? new Date(data) : null;
  }

  obterItensMenuProcesso(processo: any, rowIndex: number): MenuItem[] {
    const items = this.mapaItensMenuProcesso.get(processo.id);
    return items ? items : [];
  }

  obterItensMenuGrupoProcesso(grupo: any, rowIndex: number): MenuItem[] {
    const items = this.mapaItensMenuGrupoProcesso.get(grupo.id);
    return items ? items : [];
  }


  listarProcessos(): void {
    this.processoService.listar()
    .subscribe({
      next: (processos: Processo[]) => {
        this.listaProcessos = processos.map(processo => ({
          ...processo,
          dataInicio: processo.dataInicio ? this.utilsService.formatarData(processo.dataInicio.toString()) : null,
          dataPrevista: processo.dataPrevista ? this.utilsService.formatarData(processo.dataPrevista.toString()) : null,
          valorCausa: processo.valorCausa ?? 0
        }));


        this.listaProcessos.forEach(processo => {
          this.mapaItensMenuProcesso.set(processo.id, [
            {
              label: 'Detalhes',
              icon: 'pi pi-external-link',
              url: 'http://angular.io',
              command: () => {
                this.exibirDetable(processo);
              }
            },
            {
              label: 'Deletar',
              icon: 'pi pi-times',
              command: () => {
                this.exibirModalExcluirProcesso(processo);
              }
            }
          ]);
        });

        this.listaProcessos = this.listaProcessos.slice(); // Força a atualização da lista.


      },
      error: (error) => {
        console.error('Ocorreu um erro ao listar os processos:', error);
        this.listaProcessos = []; // Atribui um array vazio em caso de erro
      }
    });
  }

  listarGrupoProcesso(): void {
    this.grupoprocessoService.listar(this.exibeEncerrados).subscribe(
      (grupoProcesso: GrupoProcessoModel[]) => {
        if (grupoProcesso.length == 0 && this.exibeEncerrados == false)
          this.grupoprocessoService.criaGrupoInicial().subscribe(
            () => {
              this.listarGrupoProcesso()
            },
            (error) => {
              console.error('Erro ao cadastrar:', error);
            }
          );
        else
        {

          this.listaGrupos = grupoProcesso; // Atribui a lista de objetos "grupoProcesso" a "listaGrupos".

          this.listaGrupos.forEach(grupo => {

            this.mapaItensMenuGrupoProcesso.set(grupo.id, [
              {
                label: 'Deletar',
                icon: 'pi pi-times',
                command: () => {
                  this.exibirModalExcluirGrupoProcesso(grupo);
                }
              }
            ]);


            grupo.processos.forEach(processo => {
              this.mapaItensMenuProcesso.set(processo.id, [
                {
                  label: 'Detalhes',
                  icon: 'pi pi-external-link',
                  command: () => {
                    this.exibirDetable(processo);
                  }
                },
                {
                  label: 'Editar',
                  icon: 'pi pi-pencil',
                  command: () => {
                    this.abrirModalCadastroProcesso(processo.id, grupo.id);  // Passando grupo.id como segundo argumento
                  }
                },
                {
                  label: 'Deletar',
                  icon: 'pi pi-times',
                  command: () => {
                    this.exibirModalExcluirProcesso(processo);
                  }
                }
              ]);
            });
          });

           this.novoProcessos = this.listaGrupos.map(() => ({
            id: 0,
            numero: '',
            descricao: '',
            dataCadastro: null,
            dataInicio: null,
            dataPrevista: null,
            dataFinal: null,
            motivoFinal: null,
            valorCausa: 0,
            grupoProcessoId: null,
            ativo: true,
          }));
        }

      },
      (error) => {
        console.log('Ocorreu um erro ao listar os processos:', error);
        this.listaProcessos = []; // Atribui um array vazio em caso de erro
      }
    );
  }

  // listarGrupoItemProcesso(): void {
  //   this.processoService.listarGrupoItemProcesso().subscribe(
  //     (grupoItemProcesso: Record<string, Processo[]>[]) => {
  //       // if (grupoItemProcesso.length == 0 )
  //       //   this.processoService.criaGrupoInicial().subscribe();
  //       // else
  //         this.listaGruposItem = grupoItemProcesso
  //       console.log(this.listaGruposItem)
  //     },
  //     (error) => {
  //       console.error('Ocorreu um erro ao listar os processos:', error);
  //       this.listaProcessos = []; // Atribui um array vazio em caso de erro
  //     }
  //   );
  // }

  formatarValor(valor: number): string {
    let valorFloat = parseFloat(valor.toFixed(2));
    let formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let valorFormatado = formatador.format(valorFloat);

    // Isso não deve ser necessário, pois a localidade 'pt-BR' deve usar vírgulas
    // como o separador decimal por padrão. No entanto, se por algum motivo estiver vendo
    // pontos sendo usados, você pode forçar a substituição de pontos por vírgulas.
    valorFormatado = valorFormatado.replace('.', ',');

    return valorFormatado;
  }

  formatarValorInput(valor: number): string {
    // Converter o valor para uma string com duas casas decimais.
    // Isso não incluirá um símbolo de moeda ou separador de milhares.
    let valorFormatado = valor.toFixed(2);

    // Substituir o ponto decimal por uma vírgula.
    valorFormatado = valorFormatado.replace('.', ',');

    return valorFormatado;
  }

  capturaGrupoAntigo(grupo: GrupoProcesso) {
    this.grupoAntigo = {...grupo};
  }

  capturaProcessoAntigo(processo: Processo) {
    this.processoAntigo = {...processo};
  }

  verificaDiferenca(processo: Processo, grupo: GrupoProcesso): boolean{
    let processoExistente = this.listaGrupos.find(g => g.processos.find(p => p.id === processo.id));

    if (processoExistente) {
      if (JSON.stringify(processo) === JSON.stringify(this.processoAntigo)) {
        return false;
      }else
        return true; //retorna true se houve diferença
    }

    return false;
  }

  salvarProcesso(processo: Processo, grupo: GrupoProcesso) {
    processo.dataInicio = processo.dataInicio === '' ? null : processo.dataInicio;
    processo.dataPrevista = processo.dataPrevista === '' ? null : processo.dataPrevista;
    processo.grupoProcessoId = grupo.id;

    if (processo.valorCausa.toString().includes(',')) {
      let valorComoString = processo.valorCausa.toString().replace(',', '.');
      let valorComoNumero = parseFloat(valorComoString);

      // Limitar a precisão decimal a duas casas.
      // let valorComDuasCasasDecimais = parseFloat(valorComoNumero.toFixed(2));

      // processo.valorCausa = valorComDuasCasasDecimais;
    }

    if (this.verificaDiferenca(processo, grupo))
    this.processoService.editar(processo).subscribe({
      next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso' });
          this.listarGrupoProcesso();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: error.error.message });
      }
    });

  }

  salvarGrupoProcessoNovo(grupo: GrupoProcesso) {
    grupo.ativo = true

    if (grupo.nome !== '') {
      this.grupoprocessoService.salvar(grupo).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Cadastro realizado com sucesso' });
          this.listarGrupoProcesso();
          this.grupoNovo.nome = '';
        }
      });
    }
  }

  salvarGrupoProcesso(grupo: GrupoProcesso) {
    grupo.ativo = true

    if (grupo.nome !== '') {
      this.grupoprocessoService.editar(grupo).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Alteração realizada com sucesso' });
          this.listarGrupoProcesso();
        }
      });
    }
  }

  salvarProcessoNovo(processo: Processo, grupo: GrupoProcesso) {
    processo.dataInicio = null;
    processo.dataPrevista = null;
    processo.grupoProcessoId = grupo.id;
    processo.ativo = true;

    if (processo.descricao !== '') {
      this.processoService.salvar(processo).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Cadastro realizado com sucesso' });
          this.listarGrupoProcesso();
        }
      });
    }
  }

  abrirModalCadastroProcesso(processoId: number, grupoId: number) {
    let ref;
    if (processoId === 0) {
      ref = this.dialogService.open(ProcessoCadastroModalComponent, {
        header: 'Cadastrar Processo',
        width: '75%',
      });
    } else {
      ref = this.dialogService.open(ProcessoCadastroModalComponent, {
        header: 'Editar Processo',
        width: '75%',
        data: { processoId: processoId, grupoId: grupoId  }
      });
    }

    ref.onClose.subscribe((result) => {
      this.processoCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
        if (mensagem.tipo)
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem.mensagem });
        else{
          if(mensagem.mensagem)
          this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
        }

        this.listarGrupoProcesso();
      });
    });
  }


}
