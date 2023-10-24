export interface PessoasProcessoModel {
  id: number;
  nome: string;
  dataNascimento?: string | null;
  idade?: number | null;
  email?: string | null;
  cpfCnpj: string;
  identidade: string;
  dddTelefone?: string | null;
  telefone?: string | null;
  dddCelular?: string | null;
  celular?: string | null;
  idTipoPessoa? : number | null;
  tipoPessoaDescricao?: string | null;
  ativo: boolean;
}
