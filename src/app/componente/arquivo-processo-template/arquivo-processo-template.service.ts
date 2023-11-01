import { Injectable } from '@angular/core';
import { ArquivoProcessoTemplate } from 'src/app/models/ArquivoProcessoTemplate';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Pessoa } from 'src/app/models/pessoa';
import { TipoPessoaTemplateModel } from 'src/app/models/tipoPessoaTemplateModel';
import { PessoasProcessoModel } from 'src/app/models/pessoasProcessoModel';

@Injectable({
  providedIn: 'root'
})
export class ArquivoProcessoTemplateService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  salvar(formData: FormData, idProcesso: number, tiposPessoaTemplateModel: TipoPessoaTemplateModel[]) : Observable<ArquivoProcessoTemplate>{
    // Converta tiposPessoaTemplateModel para uma string JSON e adicione ao formData
    formData.append("tipoPessoaTemplateModel", JSON.stringify(tiposPessoaTemplateModel));
    return this.http.post<ArquivoProcessoTemplate>(this.utilsService.API + `/ArquivoProcessoTemplate/Adicionar?idProcesso=${idProcesso}`, formData);
  }

  salvarTiposPessoaTemplate(listaTiposTemplate: TipoPessoaTemplateModel[]) : Observable<TipoPessoaTemplateModel[]>{
    return this.http.post<TipoPessoaTemplateModel[]>(this.utilsService.API + `/ArquivoProcessoTemplate/AdicionarTipoPessoaTemplate`, listaTiposTemplate);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/ArquivoProcessoTemplate/Deletar?id=' + id);
  }

  ListarPessoaTemplate(idArquivoTemplate: number, idProcesso: number): Observable<PessoasProcessoModel[]> {
    return this.http.get<PessoasProcessoModel[]>(this.utilsService.API + `/ArquivoProcessoTemplate/ListarPessoaTemplate/${idArquivoTemplate}/${idProcesso}`);
  }

  listarPessoasArquivoTemplate(idProcesso: number, tiposPessoaTemplate: TipoPessoaTemplateModel[]): Observable<PessoasProcessoModel[]> {
    // Definimos o endpoint para a requisição
    const url = this.utilsService.API + '/ArquivoProcessoTemplate/listarPessoasArquivoTemplate';

    // Criamos o corpo da requisição
    const data = {
      idProcesso: idProcesso,
      tiposPessoaTemplate: tiposPessoaTemplate
    };

    // Realizamos a requisição POST
    return this.http.post<PessoasProcessoModel[]>(url, data);
  }

  listar(): Observable<ArquivoProcessoTemplate[]> {
    return this.http.get<ArquivoProcessoTemplate[]>(this.utilsService.API + '/ArquivoProcessoTemplate/Listar');
  }

  listarTiposPessoaTemplate(idArquivoTemplate: number): Observable<TipoPessoaTemplateModel[]> {
    return this.http.get<TipoPessoaTemplateModel[]>(this.utilsService.API + `/ArquivoProcessoTemplate/ListarTiposPessoaTemplate/${idArquivoTemplate}`);
  }

  DownloadArquivoTemplate1(idProcesso: number, idPessoa: Pessoa) {
    const url = this.utilsService.API + `/ArquivoProcessoTemplate/DownloadArquivoTemplate/${idProcesso}/${idPessoa}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  DownloadArquivoTemplate(configuracaoTemplate: any) {
    const url = this.utilsService.API + '/ArquivoProcessoTemplate/DownloadArquivoTemplate/';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // O objeto de configuração é o segundo parâmetro, e as opções de requisição são o terceiro.
    // responseType é definido diretamente como 'blob'
    return this.http.post(url, configuracaoTemplate, { headers: headers, responseType: 'blob' });
  }


}
