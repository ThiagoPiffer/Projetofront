export interface Processo {
  id: number;
  numero: string;
  descricao: string;
  dataCadastro: String | null;
  dataInicio: String | null;
  dataPrevista: String | null;
  dataFinal: String | null;
  valorCausa: number;
  grupoProcessoId: number | null;
  ativo: boolean;
}
