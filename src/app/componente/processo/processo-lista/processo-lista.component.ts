import { Processo } from '../processo';
import { ProcessoService } from '../processo.service';
import { Component, OnInit, ViewChild } from '@angular/core';


import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
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
  listaProcessos: Processo[] = [];
  paginaAtual = 1;
  filtro: string = '';
  favoritos: boolean = false;

  constructor(private processoService: ProcessoService,
              private messageService: MessageService,
              private utilsService: UtilsService

              ) { }

  ngOnInit(): void {
    this.listarProcessos();
  }

  formatarData(data: string) {
    let d = new Date(data);
    let dia = ('0' + d.getDate()).slice(-2);
    let mes = ('0' + (d.getMonth() + 1)).slice(-2);
    let ano = d.getFullYear();

    return [dia, mes, ano].join('/');
  }

  listarProcessos(): void {
    const itensPorPagina = 6;

    let params = {
      pagina: this.paginaAtual.toString(),
      filtro: this.filtro,
      favoritos: this.favoritos.toString()
    };

    this.processoService.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(
      (processos: Processo[]) => {
        // this.listaProcessos = processos.map(processo => ({
        //   ...processo,
        //   data: new Date(processo.dataCadastro).toLocaleDateString('pt-BR')
        // }));

        this.listaProcessos = processos.map(processo => ({
          ...processo,
          dataCadastro: this.utilsService.formatarData(processo.dataCadastro),
          dataInicio: this.utilsService.formatarData(processo.dataInicio),
          dataPrevista: this.utilsService.formatarData(processo.dataPrevista),
          dataFinal: this.utilsService.formatarData(processo.dataFinal),
        }));

        console.log(this.listaProcessos)
      },
      (error) => {
        console.error('Ocorreu um erro ao listar os processos:', error);
        this.listaProcessos = []; // Atribui um array vazio em caso de erro
      }
    );
  }

  salvarProcesso(processo: Processo) {
    this.processoService.editar(processo).subscribe()
  }

  // createNumberMask(): any {
  //   return createNumberMask({
  //     prefix: 'R$ ',
  //     suffix: '',
  //     thousandsSeparatorSymbol: '.',
  //     allowDecimal: true,
  //     decimalSymbol: ',',
  //     decimalLimit: 2,
  //     requireDecimal: true
  //   });
  // }

  // mask = createNumberMask({
  //   prefix: '$',
  //   thousandsSeparatorSymbol: ',',
  //   decimalSymbol: '.',
  //   requireDecimal: true,
  //   allowDecimal: true,
  //   decimalLimit: 2,
  // });
}
