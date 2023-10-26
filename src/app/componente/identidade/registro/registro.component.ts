import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IdentidadeService } from './../identidade.service';
import { UsuarioLoginModel } from 'src/app/models/usuarioLoginModel';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UsuarioRegistroModel } from 'src/app/models/usuarioRegistroModel';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;
  empresaForm!: FormGroup;
  usuarioForm!: FormGroup;

  senhaMismatch = false;
  activeIndex: number = 0;



  items = [
    {label: 'Empresa'},
    {label: 'Usuario'},
    {label: 'Login'}
  ];

  constructor(private fb: FormBuilder,
      private identidadeService: IdentidadeService,
      private router: Router,
      private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nomeEmpresa: new FormControl(''),
      cnpjEmpresa: new FormControl(''),
      codigoIdentificadorEmpresa: new FormControl(''),
      nomeUsuario: new FormControl(''),
      cpfUsuario: new FormControl(''),
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      senhaConfirmacao: ['', Validators.required]
    });
  }

  next() {
    this.activeIndex++;
    if (this.activeIndex > this.items.length - 1) {
        this.activeIndex = this.items.length - 1;
    }
  }

  prev() {
    this.activeIndex--;
    if (this.activeIndex < 0) {
        this.activeIndex = 0;
    }
  }

  onSubmit() {
    const registro: UsuarioRegistroModel = {
      id: 0,
      nome: this.registerForm.get('nomeUsuario')!.value,
      cpf: this.registerForm.get('cpfUsuario')!.value,
      email: this.registerForm.get('email')!.value,
      senha: this.registerForm.get('senha')!.value,
      senhaConfirmacao: this.registerForm.get('senhaConfirmacao')!.value,
      empresaModel: {
          id: 0,
          nome: this.registerForm.get('nomeEmpresa')!.value,
          cnpj: this.registerForm.get('cnpjEmpresa')!.value,
          codigoIdentificador: this.registerForm.get('codigoIdentificadorEmpresa')!.value
      }
    };

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
