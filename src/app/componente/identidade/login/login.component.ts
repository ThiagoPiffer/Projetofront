import { IdentidadeService } from './../identidade.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioLoginModel } from 'src/app/models/usuarioLoginModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuarioLogin : UsuarioLoginModel = {
    Email: '',
    Senha: ''
  };

  constructor(private fb: FormBuilder,
              private identidadeService: IdentidadeService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.valid) {


      this.identidadeService.login(this.loginForm.value).subscribe({
        next: (response) => {
            console.log(response)
        },
      });
      console.log('Dados de login:', this.loginForm.value);
    }
  }
}
