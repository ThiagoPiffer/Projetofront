export interface ArquivoProcesso {
  id: number;
  nomeArquivo: string;
  extensaoArquivo: string;
  descricao?: string;
  tamanhoArquivo: number;
  processoId: number;
  caminhoArquivo: string;
}
