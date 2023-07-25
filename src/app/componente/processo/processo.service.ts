import { Processo } from './processo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private readonly API = 'http://localhost:5166/api/Processo'

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Processo[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()

    return this.http.get<Processo[]>(this.API);
  }

  editar(processoDto: Processo): Observable<Processo> {
    debugger
    return this.http.put<Processo>(this.API + '/Editar', processoDto)
  }
}
