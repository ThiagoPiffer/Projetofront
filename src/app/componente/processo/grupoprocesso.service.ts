import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Observable } from 'rxjs';
import { GrupoProcessoModel } from 'src/app/models/grupoprocessoModel';
import { GrupoProcesso } from 'src/app/models/grupoprocesso';


@Injectable({
  providedIn: 'root'
})
export class GrupoprocessoService {

  constructor(private http: HttpClient,
              private utilsService: UtilsService
    ) { }

  listar(): Observable<GrupoProcessoModel[]> {
    return this.http.get<GrupoProcessoModel[]>(this.utilsService.API + '/GrupoProcesso/Listar');
  }

  // listarGrupoItemProcesso(): Observable<Record<string, Processo[]>[]> {
  //   return this.http.get<Record<string, Processo[]>[]>(this.utilsService.API + '/GrupoProcesso/ListarGrupoItemProcesso');
  // }

  criaGrupoInicial(): Observable<any>{
    return this.http.get<any>(this.utilsService.API + '/GrupoProcesso/criaGrupoInicial');
  }

  salvar(grupoDto: GrupoProcesso): Observable<GrupoProcesso> {
    return this.http.post<GrupoProcesso>(this.utilsService.API + '/GrupoProcesso/Adicionar', grupoDto)
  }

  editar(grupoDto: GrupoProcesso): Observable<GrupoProcesso> {
    return this.http.post<GrupoProcesso>(this.utilsService.API + '/GrupoProcesso/Editar', grupoDto)
  }
}
