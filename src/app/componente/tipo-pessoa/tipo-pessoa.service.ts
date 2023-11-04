import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { TipoPessoaModel } from 'src/app/models/tipoPessoa'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class TipoPessoaService {
  private readonly endpointBase = '/TipoPessoa'; // Ajuste o endpoint base conforme necessário

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listarTipoPessoasProcesso(idProcesso: number): Observable<TipoPessoaModel[]> {
    return this.http.get<TipoPessoaModel[]>(`${this.utilsService.API}${this.endpointBase}/listarTipoPessoasProcesso?idProcesso=` + idProcesso);
  }

  listarTipoPessoasCompleta(): Observable<TipoPessoaModel[]> {
    return this.http.get<TipoPessoaModel[]>(`${this.utilsService.API}${this.endpointBase}/listarTipoPessoasCompleta`);
  }

  desassociarTipoPessoaProcesso(idTipoPessoa: number, idProcesso: number): Observable<TipoPessoaModel> {
    return this.http.get<TipoPessoaModel>(`${this.utilsService.API}${this.endpointBase}/DesassociarPessoaProcesso?idPessoa=${idTipoPessoa}&idProcesso=${idProcesso}`);
  }

  obterPorId(id: number): Observable<TipoPessoaModel> {
    return this.http.get<TipoPessoaModel>(`${this.utilsService.API}${this.endpointBase}/ObterPorId?id=` + id);
  }

  editar(tipoPessoa: TipoPessoaModel): Observable<TipoPessoaModel> {
    return this.http.put<TipoPessoaModel>(`${this.utilsService.API}${this.endpointBase}/Editar`, tipoPessoa);
  }

  salvar(tipoPessoa: TipoPessoaModel): Observable<TipoPessoaModel> {
    return this.http.post<TipoPessoaModel>(`${this.utilsService.API}${this.endpointBase}/Adicionar`, tipoPessoa);
  }

  associar(tipoPessoa: TipoPessoaModel, processoId: number, pessoaId: number): Observable<TipoPessoaModel> {
    return this.http.post<TipoPessoaModel>(`${this.utilsService.API}${this.endpointBase}/associar?processoId=${processoId}&pessoaId=${pessoaId}`, tipoPessoa);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.utilsService.API}${this.endpointBase}/Deletar?id=` + id);
  }
}
