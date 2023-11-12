export interface ControlePessoaExternaModel {
  idUrl: string;
  url: string;
  expiracao: Date;
  empresaId: number;
  empresa: any;
  id: number;
  ativo: boolean;
  dataCadastro: string;
}

export class ControlePessoaExternaImpl implements ControlePessoaExternaModel {
  idUrl: string = '';
  url: string = '';
  expiracao: Date = new Date();
  empresaId: number = 0;
  empresa: any = null; // Se 'empresa' tiver um tipo específico, substitua 'any' por esse tipo
  id: number = 0;
  ativo: boolean = true;
  dataCadastro: string = '';

  constructor(partial?: Partial<ControlePessoaExternaModel>) {
    Object.assign(this, partial);
  }
}
