import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentidadeService } from './../identidade.service';
import { UsuarioLoginModel } from 'src/app/models/usuarioLoginModel';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;
  senhaMismatch = false;

  constructor(private fb: FormBuilder,
              private identidadeService: IdentidadeService,
              private router: Router,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      senhaConfirmacao: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.identidadeService.registro(this.registerForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('loginSucessoMessage', 'Usuário criado com sucesso.');
          this.router.navigate(['/login']);
        }
      });

      const { senha, senhaConfirmacao } = this.registerForm.value;
      if (senha !== senhaConfirmacao) {
        this.senhaMismatch = true;
      } else {
        this.senhaMismatch = false;
        // Aqui você pode fazer algo com os dados do formulário, como enviar para uma API.
      }
    }
  }
}
