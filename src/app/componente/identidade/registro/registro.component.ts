import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;
  passwordMismatch = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, passwordConfirmation } = this.registerForm.value;
      if (password !== passwordConfirmation) {
        this.passwordMismatch = true;
      } else {
        this.passwordMismatch = false;
        // Aqui você pode fazer algo com os dados do formulário, como enviar para uma API.
        console.log('Dados do registro:', this.registerForm.value);
      }
    }
  }
}
