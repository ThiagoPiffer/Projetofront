import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  formatarData(data: string | null): string | null {
    if (!data) {
      return null;
    }

    const formattedDate = moment(data).format('DD/MM/YYYY');

    return formattedDate;
  }


  DateTimeNow() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month starts from 0 in JavaScript
    const year = currentDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  public readonly API = environment.apiUrl
}
