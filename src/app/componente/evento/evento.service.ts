import { UtilsService } from 'src/app/Utils/utils.serive';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoModel } from 'src/app/models/evento'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly endpointBase = '/Evento'; // Ajuste o endpoint base conforme necessário

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(processoId: number): Observable<EventoModel[]> {
    return this.http.get<EventoModel[]>(`${this.utilsService.API}${this.endpointBase}/Listar?processoId=${processoId}`);
  }

  obterPorId(id: number): Observable<EventoModel> {
    return this.http.get<EventoModel>(`${this.utilsService.API}${this.endpointBase}/ObterPorId?id=${id}`);
  }

  editar(evento: EventoModel): Observable<EventoModel> {
    return this.http.put<EventoModel>(`${this.utilsService.API}${this.endpointBase}/Editar`, evento);
  }

  salvar(evento: EventoModel): Observable<EventoModel> {
    return this.http.post<EventoModel>(`${this.utilsService.API}${this.endpointBase}/Adicionar`, evento);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.utilsService.API}${this.endpointBase}/Deletar?id=${id}`);
  }
}
