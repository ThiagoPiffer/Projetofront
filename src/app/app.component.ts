import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projetofront';
  showSidebar: boolean = true; // Controla a visibilidade da barra lateral
  menuExpandido: boolean = false; // Controla se o menu está expandido ou retraído

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.showSidebar$.subscribe(show => {
      this.showSidebar = show;
      this.menuExpandido = show; // Ajusta o estado de expansão baseado na visibilidade
    });
  }
}
