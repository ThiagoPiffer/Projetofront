import { Processo } from '../processo';
import { ProcessoService } from '../processo.service';
import { Component, OnInit } from '@angular/core';


import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import {MessageService} from 'primeng/api';

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

  constructor(private processoService: ProcessoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.listarProcessos();
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
        this.listaProcessos = processos;
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
}
