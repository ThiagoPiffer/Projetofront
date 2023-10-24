export interface ArquivoProcessoTemplate {
  id: number;
  nome: string ;
  extensaoArquivo: string;
  descricao?: string;
  tamanhoArquivo: number;
  idEmpresa?: number;
  caminhoArquivo: string;
}
