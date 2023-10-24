import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  // Observable para controlar a visibilidade do menu lateral
  private showSidebar = new BehaviorSubject<boolean>(false);
  public showSidebar$ = this.showSidebar.asObservable();

  // Método para alternar a visibilidade
  public toggleSidebar(shouldShow?: boolean): void {
    this.showSidebar.next(shouldShow !== undefined ? shouldShow : !this.showSidebar.value);
  }
}
