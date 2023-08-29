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
                    this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: error.error.message });
                }
                return throwError(error);
            })
        );
    }
}
