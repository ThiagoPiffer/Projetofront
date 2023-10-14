import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';


import { environment } from '../../environments/environment';
import { IdentidadeService } from '../componente/identidade/identidade.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private identidadeService: IdentidadeService
    ,private cookieService: CookieService) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   // Pegue o usuário atual do serviço de identidade
  //   const usuarioAtual = this.identidadeService.valorUsuarioAtual;

  //   // Verifique se o usuário está logado e se o token está presente
  //   const isLoggedIn = usuarioAtual && usuarioAtual.hasOwnProperty('accessToken') && Boolean(usuarioAtual.accessToken);

  //   // Verifique se a requisição é para a API
  //   const isApiUrl = request.url.startsWith(environment.apiUrl);

  //   // Se o usuário estiver logado e a URL for da API, adicione o token de autorização
  //   if (isLoggedIn && isApiUrl) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${usuarioAtual.accessToken}`
  //       }
  //     });
  //   }
  //   console.log('request')
  //   console.log(request)
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuarioAtual = this.identidadeService.valorUsuarioAtual;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (usuarioAtual && usuarioAtual.accessToken && isApiUrl) {

      // Adicione o cabeçalho Authorization
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${usuarioAtual.accessToken}`,
        },
      });
      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
