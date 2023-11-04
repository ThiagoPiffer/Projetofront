
export interface TipoPessoaModel {
  descricao: string;
  empresaId: number;
  id: number;
  ativo: boolean;
  dataCadastro: string;
}

export class TipoPessoaImpl implements TipoPessoaModel {
  descricao: string = '';
  empresaId: number = 0;
  id: number = 0;
  ativo: boolean = true;
  dataCadastro: string = '';

  constructor(partial?: Partial<TipoPessoaModel>) {
    Object.assign(this, partial);
  }
}
