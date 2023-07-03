export interface ObjetoCustomizado {
  id?: number;
  descricao: string;
  dataCadastro: string;
  status: TipoStatusObjeto;
  anotacao: string;
  arquivo?: Uint8Array;
}

export enum TipoStatusObjeto {
  Ativo = 'Ativo',
  Inativo = 'Inativo',
  Pendente = 'Pendente',
}
