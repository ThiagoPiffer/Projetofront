export interface UsuarioRegistroModel{
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  senhaConfirmacao: string;
  empresaModel: {
      id: number;
      nome: string;
      cnpj: string;
      codigoIdentificador: string;
  };
}
