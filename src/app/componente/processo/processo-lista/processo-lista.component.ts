import { Processo } from '../../../models/processo';
import { GrupoProcesso } from '../../../models/grupoprocesso';
import { GrupoProcessoModel } from 'src/app/models/grupoprocessoModel';

import { ProcessoService } from '../processo.service';
import { GrupoprocessoService } from  '../grupoprocesso.service';
import { Component, OnInit, ViewChild } from '@angular/core';


import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MenuItem, MessageService } from 'primeng/api';
import { InputMask } from 'primeng/inputmask';


import { UtilsService } from 'src/app/Utils/utils.serive';

// import { createNumberMask } from 'text-mask-core'; // Importe a função createNumberMask
// import { default as numberMask } from 'text-mask-addons/dist/createNumberMask';




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

  mapaItensMenu: Map<number, any[]> = new Map();

  paginaAtual = 1;
  filtro: string = '';
  favoritos: boolean = false;

  visibleModalExcluir: boolean = false;

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

  processoAntigo: Processo = {
    id: 0,
    numero: '',
    descricao: '',
    dataCadastro: null,
    dataInicio: null,
    dataPrevista: null,
    dataFinal: null,
    valorCausa: 0,
    grupoProcessoId: null,
    ativo: true,
  };

  novoProcesso: Processo = {
    id: 0,
    numero: '',
    descricao: '',
    dataCadastro: null,
    dataInicio: null,
    dataPrevista: null,
    dataFinal: null,
    valorCausa: 0,
    grupoProcessoId: null,
    ativo: true,
  };

  items: MenuItem[] | undefined;
  novoProcessos: Processo[] = [];
  processoExcluir: Processo | null = null;


  constructor(private processoService: ProcessoService,
              private grupoprocessoService: GrupoprocessoService,
              private messageService: MessageService,
              private utilsService: UtilsService

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

  exibirModalExcluir(processo: Processo) {
    this.visibleModalExcluir = true;
    this.processoExcluir = processo;
  }

  detalhes(processo: Processo) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.processoService.deletar(this.processoExcluir!).subscribe({
      next: () => {
        this.listarGrupoProcesso();
        this.visibleModalExcluir = false
      },
      error: err => {
        console.error('Erro ao excluir o processo:', err);
      }
    });
  }

  converteParaDate(data: string | null): Date | null {
    return data ? new Date(data) : null;
  }

  obterItensMenu(processo: Processo) {
    return this.mapaItensMenu.get(processo.id);
  }

  listarProcessos(): void {
    this.processoService.listar()
    .subscribe(
      (processos: Processo[]) => {
        this.listaProcessos = processos.map(processo => ({
          ...processo,
          dataCadastro: processo.dataCadastro ? this.utilsService.formatarData(processo.dataCadastro.toString()) : null,
          dataInicio: processo.dataInicio ? this.utilsService.formatarData(processo.dataInicio.toString()) : null,
          dataPrevista: processo.dataPrevista ? this.utilsService.formatarData(processo.dataPrevista.toString()) : null,
          dataFinal: processo.dataFinal ? this.utilsService.formatarData(processo.dataFinal.toString()) : null,
          valorCausa: processo.valorCausa ?? 0
        }));


        this.listaProcessos.forEach(processo => {
          this.mapaItensMenu.set(processo.id, [
            {
              label: 'Detalhes',
              icon: 'pi pi-external-link',
              url: 'http://angular.io',
              command: () => {
                this.detalhes(processo);
              }
            },
            {
              label: 'Deletar',
              icon: 'pi pi-times',
              command: () => {
                this.exibirModalExcluir(processo);
              }
            }
          ]);
        });

        this.listaProcessos = this.listaProcessos.slice(); // Força a atualização da lista.


      },
      (error) => {
        console.error('Ocorreu um erro ao listar os processos:', error);
        this.listaProcessos = []; // Atribui um array vazio em caso de erro
      }
    );
  }

  listarGrupoProcesso(): void {
    this.grupoprocessoService.listar().subscribe(
      (grupoProcesso: GrupoProcessoModel[]) => {
        if (grupoProcesso.length == 0 )
          this.processoService.criaGrupoInicial().subscribe(
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
            grupo.processos.forEach(processo => {
              this.mapaItensMenu.set(processo.id, [
                {
                  label: 'Detalhes',
                  icon: 'pi pi-external-link',
                  url: 'http://angular.io',
                  command: () => {
                    this.detalhes(processo);
                  }
                },
                {
                  label: 'Deletar',
                  icon: 'pi pi-times',
                  command: () => {
                    this.exibirModalExcluir(processo);
                  }
                }
              ]);
            });
          });


           console.log(this.listaGrupos)

           this.novoProcessos = this.listaGrupos.map(() => ({
            id: 0,
            numero: '',
            descricao: '',
            dataCadastro: null,
            dataInicio: null,
            dataPrevista: null,
            dataFinal: null,
            valorCausa: 0,
            grupoProcessoId: null,
            ativo: true,
          }));
        }

      },
      (error) => {
        console.error('Ocorreu um erro ao listar os processos:', error);
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
    processo.dataCadastro = processo.dataCadastro === '' ? null : processo.dataCadastro;
    processo.dataFinal = processo.dataFinal === '' ? null : processo.dataFinal;
    processo.dataInicio = processo.dataInicio === '' ? null : processo.dataInicio;
    processo.dataPrevista = processo.dataPrevista === '' ? null : processo.dataPrevista;
    processo.grupoProcessoId = grupo.id;

    if (processo.valorCausa.toString().includes(',')) {
      let valorComoString = processo.valorCausa.toString().replace(',', '.');
      let valorComoNumero = parseFloat(valorComoString);

      // Limitar a precisão decimal a duas casas.
      let valorComDuasCasasDecimais = parseFloat(valorComoNumero.toFixed(2));

      processo.valorCausa = valorComDuasCasasDecimais;
    }

    if (this.verificaDiferenca(processo, grupo))
      this.processoService.editar(processo).subscribe()
  }

  salvarGrupoProcessoNovo(grupo: GrupoProcesso) {
    grupo.ativo = true

    if (grupo.nome !== '') {
      this.grupoprocessoService.editar(grupo).subscribe({
        next: () => {
          this.listarGrupoProcesso();
        },
        error: err => {
          console.error('Erro ao salvar o processo:', err);
        }
      });
    }
  }

  salvarGrupoProcesso(grupo: GrupoProcesso) {
    grupo.ativo = true

    if (grupo.nome !== '') {
      this.grupoprocessoService.editar(grupo).subscribe({
        next: () => {
          this.listarGrupoProcesso();
        },
        error: err => {
          console.error('Erro ao salvar o processo:', err);
        }
      });
    }
  }

  salvarProcessoNovo(processo: Processo, grupo: GrupoProcesso) {
    processo.dataCadastro = this.utilsService.DateTimeNow();
    processo.dataFinal = null;
    processo.dataInicio = null;
    processo.dataPrevista = null;
    processo.grupoProcessoId = grupo.id;
    processo.ativo = true;

    if (processo.numero !== '') {
      this.processoService.salvar(processo).subscribe({
        next: () => {
          console.log('salvarProcessoNovo')
          this.listarGrupoProcesso();
        },
        error: err => {
          console.error('Erro ao salvar o processo:', err);
        }
      });
    }
  }

}
