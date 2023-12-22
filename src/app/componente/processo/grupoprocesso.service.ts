import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Observable } from 'rxjs';
import { GrupoProcessoModel } from 'src/app/models/grupoprocessoModel';
import { GrupoProcesso } from 'src/app/models/grupoprocesso';

import { IdentidadeService } from '../identidade/identidade.service';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';







@Injectable({
  providedIn: 'root'
})
export class GrupoprocessoService {

  constructor(private http: HttpClient,
              private utilsService: UtilsService,
              private identidadeService: IdentidadeService
    ) { }

  listar(exibeEncerrados: boolean ): Observable<GrupoProcessoModel[]> {
    return this.http.get<GrupoProcessoModel[]>(this.utilsService.API + `/GrupoProcesso/Listar?exibeEncerrados=${exibeEncerrados}`);
  }

  // listar(): Observable<GrupoProcessoModel[]> {
  //   const usuarioAtual = this.identidadeService.valorUsuarioAtual;
  //   console.log('usuarioAtual.accessToken', usuarioAtual.accessToken);

  //   if (!usuarioAtual || !usuarioAtual.accessToken) {
  //       console.error('Token não encontrado');
  //       // Você pode retornar um Observable vazio ou tratar de alguma outra forma
  //       return of([]);
  //   }

  //   const headers = new HttpHeaders()
  //       // .set('Authorization', `Bearer ${usuarioAtual.accessToken}`);

  //       .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBUEkiOiJMZXIiLCJzdWIiOiI5MTJkODM2Yy0zYzkxLTQ5OWQtODQ1ZS1kODUyODBjMTdiNGYiLCJlbWFpbCI6InRlc3RlMUB0ZXN0ZSIsImp0aSI6IjVjM2Q1OGM4LTM1N2UtNGJkOS1hZjA3LWU2MTI5MDk1NDE4ZiIsIm5iZiI6MTY5NjgxNzIxOCwiaWF0IjoxNjk2ODE3MjE4LCJleHAiOjE2OTY4MjQ0MTgsImlzcyI6Ikdlc3Rhb1Byb2R1dG8ifQ.twz2a6KhRqrg3YzzO5Jf-cP7wFK0Da_GscGqIeqS1Tk`);

  //   console.log('headers', headers);

  //   const requestOptions = {
  //       headers: headers
  //   };

  //   return this.http.get<GrupoProcessoModel[]>(this.utilsService.API + '/GrupoProcesso/Listar', requestOptions)
  //       .pipe(
  //           tap(data => console.log('Dados recebidos:', data), // Log para verificar os dados recebidos
  //               error => console.log('Erro na requisição:', error)) // Log para verificar erros
  //       );
  // }

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

  deletar(grupoDto: GrupoProcesso): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/GrupoProcesso/Deletar?id=' + grupoDto.id)
  }
}
