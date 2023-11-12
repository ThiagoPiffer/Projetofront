import { Component, OnInit } from '@angular/core';
import { PessoaCadastroModalComponent } from '../../Pessoa/pessoa-cadastro-modal/pessoa-cadastro-modal.component';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlePessoaExternaService } from '../controle-pessoa-externa.service';
import { ControlePessoaExternaModel } from 'src/app/models/controlePessoaExternaModel';

import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PessoaCompartilhadoService } from '../../Pessoa/pessoa-compartilhado.service';




@Component({
  selector: 'app-cadastro-pessoa-externa',
  templateUrl: './cadastro-pessoa-externa.component.html',
  styleUrls: ['./cadastro-pessoa-externa.component.css']
})
export class CadastroPessoaExternaComponent implements OnInit {

  idCadastroPessoaExterna: string | any;
  controlePessoaExternaModel: ControlePessoaExternaModel | any;
  retonarLogin = false;

  constructor(
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private controlePessoaExternaService: ControlePessoaExternaService,
    private messageService: MessageService,
    private pessoaCompartilhadoService: PessoaCompartilhadoService
) { }

  ngOnInit(): void {
    this.verificaIdCadastroPessoaExterna()
    this.verificaValidadeCadastro();
  }

  verificaValidadeCadastro() {
    this.controlePessoaExternaService.validar(this.idCadastroPessoaExterna).subscribe(
      {
        next: (data) =>{
          this.controlePessoaExternaModel = data;
          this.abrirModalCadastroPessoa(0);
        },
        error: (error) => {
          this.router.navigate(['/login']);
        },
      }
    )
  }

  verificaIdCadastroPessoaExterna()
  {
    // Use o serviço ActivatedRoute para acessar o valor do parâmetro
    this.route.params.subscribe(params => {
      if (params['id']) // 'id' deve corresponder ao nome do segmento de rota definido na configuração da rota
        this.idCadastroPessoaExterna = params['id']
      else
      this.idCadastroPessoaExterna = 0;
    });
  }

  abrirModalCadastroPessoa(id: number) {
    let ref;
    if (id === 0) {
      ref = this.dialogService.open(PessoaCadastroModalComponent, {
        header: 'Cadastro Externo',
        width: '35%',
        data:
        {
          pessoaId: id ,
          cadastroExterno: true,
          controlePessoaExternaModel: this.controlePessoaExternaModel
        }
      });
    } else {
      ref = this.dialogService.open(PessoaCadastroModalComponent, {
        header: 'Edição Externa',
        width: '35%',
        data:
        {
          pessoaId: id ,
          cadastroExterno: true,
          controlePessoaExternaModel: this.controlePessoaExternaModel
        }
      });
    }

    ref.onClose.subscribe((result) => {
      this.pessoaCompartilhadoService.mensagem$.pipe(take(1)).subscribe(mensagem => {
        if (mensagem.tipo)
          setTimeout(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Cadastro realizado com sucesso!',
              detail: 'Clique para fechar manualmente.',
              sticky: true
            });
          }, 100); // Aguard
        else{
          if(mensagem.mensagem)
          this.messageService.add({ severity: 'error', summary: 'Erro no processo', detail: mensagem.mensagem });
        }

        // this.listarPessoasProcesso();
      });
    });
  }
}
