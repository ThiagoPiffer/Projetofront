export interface EventoModel {
  id: number;
  nome: string;
  descricao: string;
  dataFinal: Date;
  processoId: number;
  empresaId: number;
  ativo: boolean;
  dataCadastro: string;
}

export class EventoImpl implements EventoModel {
  nome: string = '';
  descricao: string = '';
  dataFinal: Date = new Date();
  processoId: number = 0;
  empresaId: number = 0;
  id: number = 0;
  ativo: boolean = true;
  dataCadastro: string = '';

  constructor(partial?: Partial<EventoModel>) {
    Object.assign(this, partial);
  }
}
