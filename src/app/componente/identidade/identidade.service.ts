import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { UsuarioLoginModel } from 'src/app/models/usuarioLoginModel';
import { UsuarioRegistroModel } from 'src/app/models/usuarioRegistroModel';

@Injectable({
  providedIn: 'root'
})
export class IdentidadeService {
  private usuarioAtualSubject: BehaviorSubject<any>;
  public usuarioAtual: Observable<any>;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) {
    this.usuarioAtualSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('usuarioAtual') || 'null'));
    this.usuarioAtual = this.usuarioAtualSubject.asObservable();
  }

  public get valorUsuarioAtual(): any {
    let value = this.usuarioAtualSubject.value;
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  }

  login(data: any): Observable<UsuarioLoginModel> {
    let usuario: UsuarioLoginModel = {
      Email: data.email,
      Senha: data.senha
    };

    return this.http.post<UsuarioLoginModel>(this.utilsService.API + '/Identidade/login', usuario)
      .pipe(map(resposta => {
        if (resposta && resposta.accessToken) {
          localStorage.setItem('usuarioAtual', JSON.stringify(resposta));
          this.usuarioAtualSubject.next(resposta);
        }
        return resposta;
      }));
  }

  registro(data: any): Observable<UsuarioRegistroModel> {
    console.log(data)
    let usuarioRegistro: UsuarioRegistroModel = {
      id: 0,
      nome: data.nomeUsuario,
      cpf: data.cpfUsuario,
      email: data.email,
      senha: data.senha,
      senhaConfirmacao: data.senhaConfirmacao,
      empresaModel: {
          id: 0,
          nome: data.nomeEmpresa,
          cnpj: data.cnpjEmpresa,
          codigoIdentificador: data.codigoIdentificadorEmpresa,
      }
    };
    console.log(usuarioRegistro)

    return this.http.post<UsuarioRegistroModel>(this.utilsService.API + '/Identidade/registro', usuarioRegistro)
      .pipe(map(resposta => {
        return resposta;
      }));
  }

  logout(): Observable<void> {
    // Faça a chamada de logout para a API, se necessário
    // Por exemplo, se sua API tem um endpoint '/Identidade/sair'

    return this.http.get<UsuarioRegistroModel>(this.utilsService.API + '/Identidade/sair')
      .pipe(
        map(resposta => {
          // Limpa o Local Storage
          localStorage.removeItem('usuarioAtual'); // limpa usuario da sessao
          this.usuarioAtualSubject.next(null);

          // Você pode retornar null ou vazio aqui, já que o tipo de retorno é Observable<void>
          return;
        })
      );
  }


  private setCookie(name: string, value: string, hours: number): void {
      let expires = '';
      if (hours) {
          const date = new Date();
          date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  private getCookie(name: string): any {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  private deleteCookie(name: string): void {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
}
