import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Currency } from '../../../interface/currency.interface';
import { format } from 'date-fns';

@Component({
  selector: 'app-dolar-api-card-currency',
  standalone: true,
  imports: [],
  templateUrl: './dolar-api-card-currency.component.html',
  styleUrl: './dolar-api-card-currency.component.css'
})
export class DolarApiCardCurrencyComponent implements OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currency'] && this.currency) {
      this.message = `El dolar ${this.currency.nombre} está cotizando a $${this.currency.compra.toFixed(2)} para la compra y $${this.currency.venta.toFixed(2)} para la venta. Fecha de la cotización: ${this.calcularFechaActual()}`;
    }
  }

  @Input() currency!:Currency
  message:string="" //Mensaje para copyToClipboard

  calcularFechaActual() {
    const now = new Date();
    const formattedDate = format(now, "dd/MM/yyyy 'a las' HH:mm:ss")
    return formattedDate;
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

}
