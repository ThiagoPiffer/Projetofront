import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  formatarData(data: string) {
    let d = new Date(data);
    let dia = ('0' + d.getDate()).slice(-2);
    let mes = ('0' + (d.getMonth() + 1)).slice(-2);
    let ano = d.getFullYear();

    return [dia, mes, ano].join('/');
  }
}
