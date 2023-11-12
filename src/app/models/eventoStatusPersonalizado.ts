import { EmpresaModel } from './empresa'

export interface EventoStatusPersonalizadoModel {
  id: number;
  nome: string;
  descricao: string;
  mensagemNotificacao: string;
  validaCondicao: boolean;
  maiorQue: boolean;
  menorQue: boolean;
  igualA: boolean;
  valorControle: number;
  cor: string;
  icone: string;
  empresaId: number;
  // empresa: EmpresaModel;
}

export class EventoStatusPersonalizadoImpl implements EventoStatusPersonalizadoModel {
  id: number = 0;
  nome: string = '';
  descricao: string = '';
  mensagemNotificacao: string = '';
  validaCondicao: boolean = false;
  maiorQue: boolean = false;
  menorQue: boolean = false;
  igualA: boolean = false;
  valorControle: number = 0;
  cor: string = '';
  icone: string = '';
  empresaId: number = 0;
  // empresa: EmpresaModel = {
  //   id: 0,
  //   nome: '',
  //   cnpj: '',
  //   codigoIdentificador: ''
  // };

  constructor(partial?: Partial<EventoStatusPersonalizadoModel>) {
    Object.assign(this, partial);
  }
}
