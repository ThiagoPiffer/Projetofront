export interface Pessoa {
  id: number;
  nome: string;
  dataNascimento?: string;
  idade?: number;
  email?: string;
  cpfcnpj?: string;
  identidade?: string;
  dddTelefone?: string;
  telefone?: string;
  dddCelular?: string;
  celular?: string;
  ativo: boolean;
  empresaId: number;
  enderecoId?: number | null;
  nacionalidade: string | null;
  profissao: string | null;
  estadoCivil: string | null;
  cadastroExterno: boolean;
  controlePessoaExternaId: number | null;
}

export class PessoaImpl implements Pessoa {
  id: number = 0;
  nome: string = '';
  dataNascimento?: string;
  idade?: number;
  email?: string;
  cpfcnpj?: string;
  identidade?: string;
  dddTelefone?: string;
  telefone?: string;
  dddCelular?: string;
  celular?: string;
  ativo: boolean = true;
  empresaId: number = 0;
  enderecoId?: number | null = null;
  nacionalidade: string | null = null;
  profissao: string | null = null;
  estadoCivil: string | null = null;
  cadastroExterno: boolean = false;
  controlePessoaExternaId: number | null = null;

  constructor(partial?: Partial<Pessoa>) {
    Object.assign(this, partial);
  }
}

