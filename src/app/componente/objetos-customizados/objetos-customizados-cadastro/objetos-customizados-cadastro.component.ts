import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ObjetosCustomizadosService } from '../objetos-customizados.service';
import { ObjetoCustomizado } from '../objetos-customizados';


@Component({
  selector: 'app-objetos-customizados-cadastro',
  templateUrl: './objetos-customizados-cadastro.component.html',
  styleUrls: ['./objetos-customizados-cadastro.component.css']
})
export class ObjetosCustomizadosCadastroComponent {
    cadastroForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private _objetoCustomizadoService: ObjetosCustomizadosService
      ) {
      this.cadastroForm = this.formBuilder.group({
        id: [null],
        descricao: [null, Validators.required],
        dataCadastro: [null, Validators.required],
        status: [null, Validators.required],
        anotacao: [null, Validators.required],
        arquivo: [null],
        ativo: [true]
      });
    }

    cadastrar() {
      if (this.cadastroForm.valid) {
        this._objetoCustomizadoService.criar(this.cadastroForm.value).subscribe()
      }
    }
  }
