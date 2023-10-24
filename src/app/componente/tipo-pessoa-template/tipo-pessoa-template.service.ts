import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { TipoPessoaTemplateModel } from 'src/app/models/tipoPessoaTemplateModel'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class TipoPessoaTemplateService {
  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<TipoPessoaTemplateModel[]> {
    return this.http.get<TipoPessoaTemplateModel[]>(this.utilsService.API + '/TipoPessoaTemplate/Listar');
  }

  obterPorId(id: number): Observable<TipoPessoaTemplateModel> {
    return this.http.get<TipoPessoaTemplateModel>(this.utilsService.API + '/TipoPessoaTemplate/ObterPorId?id=' + id);
  }

  editar(tipoPessoaTemplate: TipoPessoaTemplateModel): Observable<TipoPessoaTemplateModel> {
    return this.http.put<TipoPessoaTemplateModel>(this.utilsService.API + '/TipoPessoaTemplate/Editar', tipoPessoaTemplate);
  }

  salvar(tipoPessoaTemplate: TipoPessoaTemplateModel): Observable<TipoPessoaTemplateModel> {
    return this.http.post<TipoPessoaTemplateModel>(this.utilsService.API + '/TipoPessoaTemplate/Adicionar', tipoPessoaTemplate);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/TipoPessoaTemplate/Deletar?id=' + id);
  }
}
