import { IdentidadeService } from './../identidade.service';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioLoginModel } from 'src/app/models/usuarioLoginModel';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuarioLogin: UsuarioLoginModel = {
    Email: '',
    Senha: ''
  };

  constructor(private fb: FormBuilder,
    private identidadeService: IdentidadeService,
    private messageService: MessageService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });

    this.messageService.add({ severity: 'info', summary: 'Teste', detail: 'Esta é uma mensagem de teste.' });
  }

  ngAfterViewInit(): void {
    // Verifica se há uma mensagem de erro no localStorage e a exibe
    let errorMessage = localStorage.getItem('loginErrorMessage');

    if (errorMessage) {
      this.messageService.add({ key: 'custom', severity: 'error', summary: 'Erro', detail: errorMessage });
      localStorage.removeItem('loginErrorMessage'); // Remova a mensagem após exibí-la
    }

    errorMessage = localStorage.getItem('loginSucessoMessage');

    if (errorMessage) {
      this.messageService.add({ key: 'custom', severity: 'success', summary: 'Erro', detail: errorMessage });
      localStorage.removeItem('loginSucessoMessage'); // Remova a mensagem após exibí-la
    }
  }


  onSubmit() {

    if (this.loginForm.valid) {


      this.identidadeService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/processo-lista']);
        },
        error: (error) => {
          // Armazena a mensagem de erro no localStorage
          localStorage.setItem('loginErrorMessage', 'Usuário ou senha incorretos');
          window.location.reload();
        },
      });

    }
  }
}
