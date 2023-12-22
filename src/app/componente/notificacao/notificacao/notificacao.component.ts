import { Component, OnInit } from '@angular/core';
import { ProcessoCompartilhadoService } from '../../processo/processo-compartilhado.service';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {
  iconePagina = 'fas fa-bell'
  caminhoPagina = 'Notificações'

  constructor(
    private processoCompartilhadoService : ProcessoCompartilhadoService,
  ) {

  }
  ngOnInit(): void {
    this.processoCompartilhadoService.setProcessoId(0);
  }
}
