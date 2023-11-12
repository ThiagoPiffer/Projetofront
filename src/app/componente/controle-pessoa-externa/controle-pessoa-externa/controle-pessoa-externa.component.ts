import { Component } from '@angular/core';
import { ControlePessoaExternaService } from '../controle-pessoa-externa.service';
import { ControlePessoaExternaModel } from 'src/app/models/controlePessoaExternaModel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-controle-pessoa-externa',
  templateUrl: './controle-pessoa-externa.component.html',
  styleUrls: ['./controle-pessoa-externa.component.css']
})
export class ControlePessoaExternaComponent {

  selectedDate: Date | null = null;
  linksCadastrados: ControlePessoaExternaModel[] = [];

  constructor(
    private controlePessoaExternaService: ControlePessoaExternaService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  this.atualizarLista()
  }

  atualizarLista(){
    this.controlePessoaExternaService.listar().subscribe(links => {
      this.linksCadastrados = links;

      this.linksCadastrados.forEach(link => {
        link.expiracao = new Date(link.expiracao);
      });

    });
  }

  gerarLinkExterno() {
    const dateString = this.selectedDate?.toISOString();
    this.controlePessoaExternaService.salvar(dateString!).subscribe(
      {
        next: () => {
          this.atualizarLista();
          this.selectedDate = null;
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso' });
        }
      }
    );
  }


  copyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    this.messageService.add({ severity: 'info', summary: 'Informativo', detail: 'Link copiado' });
  }


  deletarLink(id: number): void {
    this.controlePessoaExternaService.deletar(id).subscribe(() => {
      // Recarregar a lista ou remover o link deletado da lista local
      this.linksCadastrados = this.linksCadastrados.filter(link => link.id !== id);
    });
  }

}
