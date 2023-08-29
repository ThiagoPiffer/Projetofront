import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appIdentidadeMask]'
})
export class IdentidadeMaskDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
      let valor = this.el.nativeElement.value;
      valor = valor.replace(/\D/g, '');  // Remove todos os caracteres não numéricos

      if (valor.length > 9) {
          valor = valor.slice(0, 9);  // Limita a entrada a 9 dígitos
      }

      valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

      this.el.nativeElement.value = valor;

      // Verifica se o control e control.control estão definidos antes de atualizar o valor
      if (this.control && this.control.control) {
          this.control.control.setValue(valor); // Atualiza o valor no ngModel
      }
  }
}
