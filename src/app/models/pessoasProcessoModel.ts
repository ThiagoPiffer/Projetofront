export interface PessoasProcessoModel {
  id: number;
  nome: string;
  dataNascimento?: string | null;
  idade?: number | null;
  email?: string | null;
  cpfcnpj: string;
  identidade: string;
  dddTelefone?: string | null;
  telefone?: string | null;
  dddCelular?: string | null;
  celular?: string | null;
  idTipoPessoa? : number | null;
  tipoPessoaDescricao?: string | null;
  ativo: boolean;


}

export class PessoasProcessoModelImpl implements PessoasProcessoModel {
  id: number = 0;
  nome: string = '';
  dataNascimento?: string | null = null;
  idade?: number | null = null;
  email?: string | null = null;
  cpfcnpj: string = '';
  identidade: string = '';
  dddTelefone?: string | null = null;
  telefone?: string | null = null;
  dddCelular?: string | null = null;
  celular?: string | null = null;
  idTipoPessoa?: number | null = null;
  tipoPessoaDescricao?: string | null = null;
  ativo: boolean = true;



  constructor(partial?: Partial<PessoasProcessoModel>) {
    Object.assign(this, partial);
  }
}
