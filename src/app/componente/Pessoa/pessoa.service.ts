import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Pessoa } from '../../models/pessoa';
import { PessoasProcessoModel } from 'src/app/models/pessoasProcessoModel';
import { TipoPessoaTemplateModel } from 'src/app/models/tipoPessoaTemplateModel';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

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

  listarPessoasCompleta(): Observable<PessoasProcessoModel[]> {
    return this.http.get<PessoasProcessoModel[]>(this.utilsService.API + '/Pessoa/listarPessoasCompleta');
  }

  listarPessoasAssociar(idProcesso: number): Observable<PessoasProcessoModel[]> {
    return this.http.get<PessoasProcessoModel[]>(this.utilsService.API + '/Pessoa/listarPessoasAssociar?idProcesso=' + idProcesso);
  }

  listarPessoasExternas(): Observable<PessoasProcessoModel[]> {
    return this.http.get<PessoasProcessoModel[]>(this.utilsService.API + '/Pessoa/listarPessoasExterna');
  }

  obterPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.utilsService.API + '/Pessoa/ObterPorId?id=' + id);
  }

  editar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.utilsService.API + '/Pessoa/Editar', pessoa);
  }

  salvar(pessoaDto: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.utilsService.API + '/Pessoa/Adicionar', pessoaDto);
  }

  associar(pessoaDto: PessoasProcessoModel, idProcesso: number): Observable<PessoasProcessoModel> {
    return this.http.post<PessoasProcessoModel>(this.utilsService.API + '/Pessoa/associar?idProcesso=' + idProcesso, pessoaDto);
  }

  salvarCadastroExterno(pessoaDto: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.utilsService.API + '/Pessoa/AdicionarCadastroExterno', pessoaDto);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete<any>(this.utilsService.API + '/Pessoa/Deletar?id=' + id);
  }

  desassociarPessoaProcesso(idPessoa: number, idProcesso: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.utilsService.API + `/Pessoa/DesassociarPessoaProcesso?idPessoa=${idPessoa}&idProcesso=${idProcesso}`);
  }
}
