import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/Utils/utils.serive';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CabecalhoService {

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  QuantidadeNotificacao(): Observable<any> {
    return this.http.get<any>(this.utilsService.API + '/Notificacao/Quantidade');
  }
}
