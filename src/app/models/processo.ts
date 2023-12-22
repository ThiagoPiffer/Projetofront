export interface Processo {
  id: number;
  numero: string;
  descricao: string;
  dataCadastro: string | null;
  dataInicio: string | null;
  dataPrevista: string | null;
  dataFinal: string | null;
  motivoFinal: string | null;
  valorCausa: number;
  grupoProcessoId: number | null;
  ativo: boolean;
}

export class ProcessoImpl implements Processo {
  id: number = 0;
  numero: string = '';
  descricao: string = '';
  dataCadastro: string | null = null;
  dataInicio: string | null = null;
  dataPrevista: string | null = null;
  dataFinal: string | null = null;
  motivoFinal: string | null = null;
  valorCausa: number = 0;
  grupoProcessoId: number | null = null;
  ativo: boolean = true;

  constructor(partial?: Partial<Processo>) {
    Object.assign(this, partial);
  }
}
