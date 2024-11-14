import { Component, inject, OnInit } from '@angular/core';
import { Currency } from '../../../interface/currency.interface';
import { ExchangeRateService } from '../../../service/exchange-rate.service';
import { CardCurrencyComponent } from '../card-currency/card-currency.component';
import { CurrencyERA } from '../../../interface/currency-era';

@Component({
  selector: 'app-list-currency',
  standalone: true,
  imports: [CardCurrencyComponent],
  templateUrl: './list-currency.component.html',
  styleUrl: './list-currency.component.css'
})
export class ListCurrencyComponent implements OnInit{
  ngOnInit(): void {
    this.obtenerMonedasPrincipales();
    console.log(this.monedasPrincipales);

  }

  rates: any;  // Aquí almacenamos las tasas de cambio
  error: string | null = null;  // Aquí almacenamos cualquier error
  

  ers=inject(ExchangeRateService)


  codesMonedasPrincipales: string[] = [
    "USD", // Dólar Estadounidense
    "EUR", // Euro
    "JPY", // Yen Japonés
    "GBP", // Libra Esterlina
    "CHF", // Franco Suizo
    "CAD", // Dólar Canadiense
    "AUD", // Dólar Australiano
    "CNY", // Yuan Chino
    "INR", // Rupia India
    "BRL", // Real Brasileño
  ];
  monedasPrincipales: { code: string, name: string, rate: number }[] = []; // Aquí guardaremos los datos.

  obtenerMonedasPrincipales() {
    this.codesMonedasPrincipales.forEach((code) => {
      this.ers.getExchangeRates(code).subscribe({
        next: (response) => {
          const rate = response.conversion_rates["ARS"]; // Supongo que quieres el tipo de cambio respecto a ARS
          console.log(rate);
          this.monedasPrincipales.push({
            code: code,
            name: this.getNombreMoneda(code), // Un método para obtener el nombre de la moneda
            rate: rate
          });
        },
        error: (err) => {
          console.error(`Error al obtener datos para ${code}:`, err);
        }
      });
    });
  }

  getNombreMoneda(code: string): string {
    const nombres: { [key: string]: string } = {
      USD: "Dólar Estadounidense",
      EUR: "Euro",
      JPY: "Yen Japonés",
      GBP: "Libra Esterlina",
      CHF: "Franco Suizo",
      CAD: "Dólar Canadiense",
      AUD: "Dólar Australiano",
      CNY: "Yuan Chino",
      INR: "Rupia India",
      BRL: "Real Brasileño",
    };
  
    return nombres[code] || "Nombre desconocido";
  }
  

}
