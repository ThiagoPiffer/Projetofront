import { ControlePessoaExternaModel } from 'src/app/models/controlePessoaExternaModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlePessoaExternaService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<ControlePessoaExternaModel[]> {
    return this.http.get<ControlePessoaExternaModel[]>(this.utilsService.API + '/ControlePessoaExterna/listar');
  }

  salvar(dataExpiracao: string): Observable<ControlePessoaExternaModel> {
    const payload = { dataExpiracao }; // cria um objeto com a propriedade dataExpiracao
    return this.http.post<ControlePessoaExternaModel>(this.utilsService.API + '/ControlePessoaExterna/Adicionar', payload);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/ControlePessoaExterna/Deletar?id=' + id);
  }

  validar(id: string): Observable<any> {
    return this.http.get<any>(this.utilsService.API + '/ControlePessoaExterna/Validar?id=' + id);
  }
}
