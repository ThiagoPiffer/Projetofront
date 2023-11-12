import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { ArquivoProcesso } from '../../models/arquivoProcesso';  // Importe o modelo correto

@Injectable({
  providedIn: 'root'
})
export class ArquivoProcessoService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<ArquivoProcesso[]> {
    return this.http.get<ArquivoProcesso[]>(this.utilsService.API + '/ArquivoProcesso/listar');
  }

  listarArquivosProcesso(idProcesso: number): Observable<ArquivoProcesso[]> {
    return this.http.get<ArquivoProcesso[]>(this.utilsService.API + '/ArquivoProcesso/listarArquivosProcesso?idProcesso=' + idProcesso);
  }

  obterPorId(id: number): Observable<ArquivoProcesso> {
    return this.http.get<ArquivoProcesso>(this.utilsService.API + '/ArquivoProcesso/ObterPorId?id=' + id);
  }

  editar(arquivoProcessoDto: ArquivoProcesso): Observable<ArquivoProcesso> {
    return this.http.put<ArquivoProcesso>(this.utilsService.API + '/ArquivoProcesso/Editar', arquivoProcessoDto);
  }

  editarDescricao(id: number, descricao: string): Observable<ArquivoProcesso> {
    let data = {
      id: id,
      descricao: descricao
    }
    return this.http.put<ArquivoProcesso>(this.utilsService.API + '/ArquivoProcesso/EditarDescricao', data);
  }

  salvar(formData: FormData): Observable<ArquivoProcesso> {
    return this.http.post<ArquivoProcesso>(this.utilsService.API + '/ArquivoProcesso/Adicionar', formData);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/ArquivoProcesso/Deletar?id=' + id);
  }

  // DownloadArquivo(id: number) {
  //   const url = this.utilsService.API + `/ArquivoProcesso/DownloadArquivo/${id}`;
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.get(url, { headers: headers, responseType: 'blob' });
  // }

  DownloadArquivo(id: number) {
    const url = this.utilsService.API + `/ArquivoProcesso/DownloadArquivo/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
