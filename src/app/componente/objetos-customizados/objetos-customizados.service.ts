import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ObjetoCustomizado } from './objetos-customizados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetosCustomizadosService {
  private readonly API = 'https://localhost:5167/'
  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<ObjetoCustomizado[]> {
    const itensPorPagina = 6;
    //GET /posts?_page=7&_limit=20
    // return this.http
    // .get<Pensamento[]>(`${ this.API }?_page=${ pagina }&_limit=${ itensPorPagina }`)
    let params = new HttpParams()
      // .set("_page", pagina)
      // .set("_limit", itensPorPagina);

      // if(filtro.trim().length > 2) {
      //   params = params.set("q", filtro)
      // }

      // if (favoritos){
      //   params = params.set("favorito", true)
      // }

    return this.http.get<ObjetoCustomizado[]>(this.API);
  }

  criar(objetocustomizado: ObjetoCustomizado): Observable<ObjetoCustomizado> {

    return this.http.post<ObjetoCustomizado>(this.API + 'Adicionar', objetocustomizado)
  }

  // editar(pensamento: Pensamento): Observable<Pensamento> {
  //   const url = `${this.API}/${pensamento.id}`

  //   return this.http.put<Pensamento>(url, pensamento )
  // }

  // mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
  //   pensamento.favorito = !pensamento.favorito
  //   return this.editar(pensamento)
  // }

  // excluir(id: number): Observable<Pensamento> {
  //   const url = `${this.API}/${id}`
  //   return this.http.delete<Pensamento>(url)
  // }

  // buscarPorId(id: number): Observable<Pensamento> {
  //   const url = `${this.API}/${id}`
  //   return this.http.get<Pensamento>(url)
  // }
}
