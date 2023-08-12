import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  formatarData(data: string | null): string | null {
    if (!data) {
      return null;
    }
    const d = new Date(data);
    const dia = ('0' + d.getDate()).slice(-2);
    const mes = ('0' + (d.getMonth() + 1)).slice(-2);
    const ano = d.getFullYear();

    return [dia, mes, ano].join('/');
  }

  DateTimeNow() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month starts from 0 in JavaScript
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  public readonly API = 'http://localhost:5166/api'

}
