import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoPessoaCompartilhadoService {

  private mensagemSource = new BehaviorSubject<{ tipo: boolean; mensagem: string }>({ tipo: false, mensagem: '' });

  mensagem$ = this.mensagemSource.asObservable();

  enviarMensagem(tipo: boolean, mensagem: string) {
    debugger
    this.mensagemSource.next({ tipo, mensagem });
  }
}
