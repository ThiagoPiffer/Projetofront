export interface EventoModel {
  nome: string;
  descricao: string;
  dataFinal: string;
  processoId: number;
  empresaId: number;
  id: number;
  ativo: boolean;
  dataCadastro: string;
}

export class EventoImpl implements EventoModel {
  nome: string = '';
  descricao: string = '';
  dataFinal: string = '';
  processoId: number = 0;
  empresaId: number = 0;
  id: number = 0;
  ativo: boolean = true;
  dataCadastro: string = '';

  constructor(partial?: Partial<EventoModel>) {
    Object.assign(this, partial);
  }
}
