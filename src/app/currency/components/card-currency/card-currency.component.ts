import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Currency } from '../../../interface/currency.interface';
import { format } from 'date-fns';

@Component({
  selector: 'app-card-currency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-currency.component.html',
  styleUrl: './card-currency.component.css'
})
export class CardCurrencyComponent implements OnChanges{
  @Input() currency!:Currency
  @Input() currencyERA!:{ code: string, name: string, rate: number }
  message:string="" //Mensaje para copyToClipboard

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currency'] && this.currency) {
      this.message = `El ${this.currency.nombre} está cotizando a $${this.currency.compra} para la compra y $${this.currency.venta} para la venta. Fecha de la cotización: ${this.calcularFechaActual()}`;
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.message).then(
      () => {
        // Cambiar visualmente el ícono para indicar éxito
        alert('¡Mensaje copiado al portapapeles!'); // Puedes reemplazar esto con una notificación visual más elegante.
      },
      (err) => {
        console.error('Error al copiar al portapapeles: ', err);
      }
    );
  }


  calcularFechaActual(){
    const now=new Date();
    const formattedDate = format(now, "dd/MM/yyyy 'a las' HH:mm:ss")
    return formattedDate;
  }
}
