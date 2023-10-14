export interface UsuarioLoginModel{
  Email: string;
  Senha: string;
  accessToken?: string; // Acrescente essa linha
    expiresIn?: number;
    usuarioToken?: {
        id: string;
        email: string;
        claims: Array<{
            value: string;
            type: string;
        }>;
    };
    responseResult?: any; // Adapte o tipo conforme necessário
}
