import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { EventoStatusPersonalizadoModel } from 'src/app/models/eventoStatusPersonalizado';

@Injectable({
  providedIn: 'root'
})
export class EventoStatusPersonalizadoService {
  private readonly endpointBase = '/EventoStatusPersonalizado'; // Endpoint base para os serviços relacionados a EventoStatusPersonalizado

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<EventoStatusPersonalizadoModel[]> {
    return this.http.get<EventoStatusPersonalizadoModel[]>(`${this.utilsService.API}${this.endpointBase}/Listar`);
  }

  obterPorId(id: number): Observable<EventoStatusPersonalizadoModel> {
    return this.http.get<EventoStatusPersonalizadoModel>(`${this.utilsService.API}${this.endpointBase}/ObterPorId?id=${id}`);
  }

  editar(eventoStatusPersonalizado: EventoStatusPersonalizadoModel): Observable<EventoStatusPersonalizadoModel> {
    return this.http.put<EventoStatusPersonalizadoModel>(`${this.utilsService.API}${this.endpointBase}/Editar`, eventoStatusPersonalizado);
  }

  salvar(eventoStatusPersonalizado: EventoStatusPersonalizadoModel): Observable<EventoStatusPersonalizadoModel> {
    console.log(eventoStatusPersonalizado)
    return this.http.post<EventoStatusPersonalizadoModel>(`${this.utilsService.API}${this.endpointBase}/Adicionar`, eventoStatusPersonalizado);
  }

  adicionarStatusPadraoEvento(): Observable<any> {
    return this.http.get<any>(`${this.utilsService.API}${this.endpointBase}/AdicionarStatusPadraoEvento`);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.utilsService.API}${this.endpointBase}/Deletar?id=${id}`);
  }
}

