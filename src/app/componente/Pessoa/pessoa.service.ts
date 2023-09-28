import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Pessoa } from '../../models/pessoa';
import { PessoasProcessoModel } from 'src/app/models/pessoasProcessoModel';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private readonly API = 'https://localhost:5167/api'

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.utilsService.API + '/Pessoa');
  }

  listarPessoasProcesso(idProcesso: number): Observable<PessoasProcessoModel[]> {
    return this.http.get<PessoasProcessoModel[]>(this.utilsService.API + '/Pessoa/listarPessoasProcesso?idProcesso=' + idProcesso);
  }

  obterPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.utilsService.API + '/Pessoa/ObterPorId?id=' + id);
  }

  editar(pessoaDto: Pessoa): Observable<Pessoa> {
    console.log(pessoaDto)
    return this.http.put<Pessoa>(this.utilsService.API + '/Pessoa/Editar', pessoaDto);
  }

  salvar(pessoaDto: Pessoa, idProcesso: number): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.utilsService.API + '/Pessoa/Adicionar?idProcesso=' + idProcesso, pessoaDto);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/Pessoa/Deletar?id=' + id);
  }
}
