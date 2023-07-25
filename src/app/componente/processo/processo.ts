export interface Processo {
  id: number;
  numero: string;
  descricao: string;
  dataCadastro: Date;
  dataInicio: Date;
  dataPrevista: Date;
  dataFinal: Date;
  valorCausa: number;
}
