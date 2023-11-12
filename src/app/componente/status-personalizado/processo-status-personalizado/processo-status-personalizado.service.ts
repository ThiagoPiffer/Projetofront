import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { ProcessoStatusPersonalizadoModel } from 'src/app/models/processoStatusPersonalizado';

@Injectable({
  providedIn: 'root'
})
export class ProcessoStatusPersonalizadoService {
  private readonly endpointBase = '/ProcessoStatusPersonalizado'; // Endpoint base para os serviços relacionados a ProcessoStatusPersonalizado

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<ProcessoStatusPersonalizadoModel[]> {
    return this.http.get<ProcessoStatusPersonalizadoModel[]>(`${this.utilsService.API}${this.endpointBase}/Listar`);
  }

  obterPorId(id: number): Observable<ProcessoStatusPersonalizadoModel> {
    return this.http.get<ProcessoStatusPersonalizadoModel>(`${this.utilsService.API}${this.endpointBase}/ObterPorId?id=${id}`);
  }

  editar(processoStatusPersonalizado: ProcessoStatusPersonalizadoModel): Observable<ProcessoStatusPersonalizadoModel> {
    return this.http.put<ProcessoStatusPersonalizadoModel>(`${this.utilsService.API}${this.endpointBase}/Editar`, processoStatusPersonalizado);
  }

  salvar(processoStatusPersonalizado: ProcessoStatusPersonalizadoModel): Observable<ProcessoStatusPersonalizadoModel> {
    return this.http.post<ProcessoStatusPersonalizadoModel>(`${this.utilsService.API}${this.endpointBase}/Adicionar`, processoStatusPersonalizado);
  }

  adicionarStatusPadraoProcesso(): Observable<string> {
    return this.http.get<string>(`${this.utilsService.API}${this.endpointBase}/AdicionarStatusPadraoProcesso`);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.utilsService.API}${this.endpointBase}/Deletar?id=${id}`);
  }
}

