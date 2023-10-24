import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { TipoPessoaModel } from 'src/app/models/tipoPessoaModel'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class TipoPessoaService {
  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<TipoPessoaModel[]> {
    return this.http.get<TipoPessoaModel[]>(this.utilsService.API + '/TipoPessoa/Listar');
  }

  obterPorId(id: number): Observable<TipoPessoaModel> {
    return this.http.get<TipoPessoaModel>(this.utilsService.API + '/TipoPessoa/ObterPorId?id=' + id);
  }

  editar(tipoPessoa: TipoPessoaModel): Observable<TipoPessoaModel> {
    return this.http.put<TipoPessoaModel>(this.utilsService.API + '/TipoPessoa/Editar', tipoPessoa);
  }

  salvar(tipoPessoa: TipoPessoaModel): Observable<TipoPessoaModel> {
    return this.http.post<TipoPessoaModel>(this.utilsService.API + '/TipoPessoa/Adicionar', tipoPessoa);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/TipoPessoa/Deletar?id=' + id);
  }
}
