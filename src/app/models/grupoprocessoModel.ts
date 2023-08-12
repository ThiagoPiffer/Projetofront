import { Processo } from "./processo";

export interface GrupoProcessoModel {
  id: number;
  nome: string;
  posicao: number;
  ativo: boolean;
  processos: Processo[];
}
