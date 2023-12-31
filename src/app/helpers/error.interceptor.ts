import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.error instanceof ErrorEvent) {
                  // Erros do lado do cliente
                  this.messageService.add({ severity: 'error', summary: 'Erro no cliente', detail: error.error.message });
              } else {
                  // Erros do lado do servidor

                  // Tratamento específico para erro 400
                  if (error.status === 400) {
                      // Aqui, estou presumindo que sua mensagem de erro vem no formato { "": ["mensagem de erro"] }
                      let serverMessage = 'Erro desconhecido';
                      if ( error.error[''] && error.error[''][0])
                        serverMessage = error.error[''][0];
                      else if (error.error.message)
                        serverMessage = error.error.message;

                      this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: serverMessage });
                  } else {
                      this.messageService.add({ severity: 'error', summary: 'Erro desconhecido no processo', detail: error.error.message || 'Erro desconhecido' });
                  }
              }
              return throwError(error);
          })
      );
  }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(req).pipe(
    //         catchError((error: HttpErrorResponse) => {
    //           if (error.error instanceof ErrorEvent) {
    //             // Erros do lado do cliente
    //             const clientErrorMessage = error.error && error.error.message ? error.error.message : 'Erro desconhecido no lado do cliente';
    //             this.messageService.add({ severity: 'error', summary: 'Erro no cliente', detail: clientErrorMessage });
    //         } else {
    //             // Erros do lado do servidor
    //             const serverErrorMessage = error.error && error.error.message ? error.error.message : 'Erro desconhecido no lado do servidor';
    //             this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: serverErrorMessage });
    //         }
    //             return throwError(error);
    //         })
    //     );
    // }
}
