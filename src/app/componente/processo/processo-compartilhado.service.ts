import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProcessoCompartilhadoService {

  private processoIdSource = new BehaviorSubject<number>(this.getInitialValue());
  processoId$ = this.processoIdSource.asObservable();

  private mensagemSource = new BehaviorSubject<{ tipo: boolean; mensagem: string }>({ tipo: false, mensagem: '' });
  mensagem$ = this.mensagemSource.asObservable();

  constructor() { }

  private getInitialValue(): number {
    const storedValue = localStorage.getItem('processoId');
    return storedValue ? parseInt(storedValue, 10) : 0;
  }

  setProcessoId(id: number) {
    localStorage.setItem('processoId', id.toString());
    this.processoIdSource.next(id);
  }



  enviarMensagem(tipo: boolean, mensagem: string) {
    this.mensagemSource.next({ tipo, mensagem });
  }
}
