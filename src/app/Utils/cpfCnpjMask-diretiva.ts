import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCpfCnpjMask]'
})
export class CpfCnpjMaskDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
      let valor = this.el.nativeElement.value;
      valor = valor.replace(/\D/g, '');  // Remove todos os caracteres não numéricos

      if (valor.length > 14) {
          valor = valor.slice(0, 14);  // Limita a entrada a 14 dígitos
      }

      if (valor.length <= 11) {
          valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
          valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
          valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
          valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
          valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
          valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
          valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
      }

      this.el.nativeElement.value = valor;
      if (this.control && this.control.control) {
        this.control.control.setValue(valor); // Atualiza o valor no ngModel
    }  }

}
