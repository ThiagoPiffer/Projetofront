import { GrupoProcessoModel } from './../../models/grupoprocessoModel';
import { Processo } from '../../models/processo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { ProcessoStatusPersonalizadoModel } from 'src/app/models/processoStatusPersonalizado';


@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private readonly API = 'https://localhost:5167/api'

  constructor(private http: HttpClient,
              private utilsService : UtilsService
    ) { }

  listar(): Observable<Processo[]> {
    return this.http.get<Processo[]>(this.utilsService.API + '/Processo');
  }

  buscarProcessoStatus(processoId: number): Observable<ProcessoStatusPersonalizadoModel> {
    return this.http.get<ProcessoStatusPersonalizadoModel>(this.utilsService.API + `/Processo/BuscarProcessoStatus?processoId=${processoId}`);
  }

  obterProId(id: number): Observable<Processo> {
    return this.http.get<Processo>(this.utilsService.API + '/Processo/ObterPorId?id=' + id);
  }

  editar(processoDto: Processo): Observable<Processo> {
    return this.http.put<Processo>(this.utilsService.API + '/Processo/Editar', processoDto)
  }

  salvar(processoDto: Processo): Observable<Processo> {
    return this.http.post<Processo>(this.utilsService.API + '/Processo/Adicionar', processoDto)
  }


  deletar(processoDto: Processo): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/Processo/Deletar?id=' + processoDto.id)
  }

}
