import { GrupoProcessoModel } from './../../models/grupoprocessoModel';
import { Processo } from '../../models/processo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoProcesso } from 'src/app/models/grupoprocesso';


@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private readonly API = 'http://localhost:5166/api'

  constructor(private http: HttpClient) { }

  listar(): Observable<Processo[]> {
    return this.http.get<Processo[]>(this.API + '/Processo');
  }

  criaGrupoInicial(): Observable<any>{
    return this.http.get<any>(this.API + '/GrupoProcesso/criaGrupoInicial');
  }

  editar(processoDto: Processo): Observable<Processo> {
    console.log(processoDto)
    debugger
    return this.http.put<Processo>(this.API + '/Processo/Editar', processoDto)
  }

  salvar(processoDto: Processo): Observable<Processo> {
    console.log(processoDto)
    debugger
    return this.http.post<Processo>(this.API + '/Processo/Adicionar', processoDto)
  }


  deletar(processoDto: Processo): Observable<any> {
    return this.http.delete<any>(this.API + '/Processo/Deletar?id=' + processoDto.id)
  }

}
