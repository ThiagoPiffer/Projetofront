import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { TipoPessoaTemplateModel } from 'src/app/models/tipoPessoaTemplateModel'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class TipoPessoaTemplateService {
  private readonly endpointBase = '/TipoPessoaTemplate'; // Adicionado o endpoint base

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<TipoPessoaTemplateModel[]> {
    return this.http.get<TipoPessoaTemplateModel[]>(`${this.utilsService.API}${this.endpointBase}/Listar`);
  }

  obterPorId(id: number): Observable<TipoPessoaTemplateModel> {
    return this.http.get<TipoPessoaTemplateModel>(`${this.utilsService.API}${this.endpointBase}/ObterPorId?id=${id}`);
  }

  editar(tipoPessoaTemplate: TipoPessoaTemplateModel): Observable<TipoPessoaTemplateModel> {
    return this.http.put<TipoPessoaTemplateModel>(`${this.utilsService.API}${this.endpointBase}/Editar`, tipoPessoaTemplate);
  }

  salvar(tipoPessoaTemplate: TipoPessoaTemplateModel): Observable<TipoPessoaTemplateModel> {
    return this.http.post<TipoPessoaTemplateModel>(`${this.utilsService.API}${this.endpointBase}/Adicionar`, tipoPessoaTemplate);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.utilsService.API}${this.endpointBase}/Deletar?id=${id}`);
  }
}
