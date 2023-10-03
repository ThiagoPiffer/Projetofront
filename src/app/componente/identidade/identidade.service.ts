import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { UsuarioLoginModel } from 'src/app/models/usuarioLoginModel';


@Injectable({
  providedIn: 'root'
})
export class IdentidadeService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  login(data: any): Observable<UsuarioLoginModel> {
    let usuario : UsuarioLoginModel = {
      Email: data.email,
      Senha: data.senha
    }
    console.log(data);
    console.log(usuario);

    return this.http.post<UsuarioLoginModel>(this.utilsService.API + '/Identidade/login', usuario);
  }
}
