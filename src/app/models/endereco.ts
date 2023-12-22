export interface Endereco {
   numero: string;
   rua: string;
   bairro: string;
   municipio: string;
   cidade: string;
   estado: string;
   cep: string;
}


export class EnderecoImpl implements Endereco {
  numero: string = '';
  rua: string = '';
  bairro: string = '';
  municipio: string = '';
  cidade: string = '';
  estado: string = '';
  cep: string = '';

  constructor(partial?: Partial<Endereco>) {
    Object.assign(this, partial);
  }
}
