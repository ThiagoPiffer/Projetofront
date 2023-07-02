import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-objetos-customizados-cadastro',
  templateUrl: './objetos-customizados-cadastro.component.html',
  styleUrls: ['./objetos-customizados-cadastro.component.css']
})
export class ObjetosCustomizadosCadastroComponent {
    cadastroForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
      this.cadastroForm = this.formBuilder.group({
        id: [null, Validators.required],
        descricao: [null, Validators.required],
        dataCadastro: [null, Validators.required],
        status: [null, Validators.required],
        anotacao: [null],
        arquivo: [null],
        ativo: [true]
      });
    }

    cadastrar() {
      if (this.cadastroForm.valid) {
        // Lógica para salvar os dados no servidor
        console.log(this.cadastroForm.value);
      }
    }
  }
