export interface ProcessoStatusPersonalizadoModel {
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
}

export class ProcessoStatusPersonalizadoImpl implements ProcessoStatusPersonalizadoModel {
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

  constructor(partial?: Partial<ProcessoStatusPersonalizadoModel>) {
    Object.assign(this, partial);
  }
}
