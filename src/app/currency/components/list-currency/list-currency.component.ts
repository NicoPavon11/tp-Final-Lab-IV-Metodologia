import { Component, inject, OnInit } from '@angular/core';
import { Currency } from '../../../interface/currency.interface';
import { ExchangeRateService } from '../../../service/exchange-rate.service';
import { CardCurrencyComponent } from '../card-currency/card-currency.component';

@Component({
  selector: 'app-list-currency',
  standalone: true,
  imports: [CardCurrencyComponent],
  templateUrl: './list-currency.component.html',
  styleUrl: './list-currency.component.css'
})
export class ListCurrencyComponent implements OnInit{
  ngOnInit(): void {
    //Cuando abro la list, cargo los datos de todas las monedas
    this.ers.getDolarRates().subscribe({
      next:(response:Currency[])=>{
        this.dolarRates=response
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    })

    this.ers.getOtherRates().subscribe({
      next:(response:Currency[])=>{
        this.otherRates=response
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    })
  }

  rates: any;  // Aquí almacenamos las tasas de cambio
  error: string | null = null;  // Aquí almacenamos cualquier error
  dolarRates:Currency[]=[];
  otherRates:Currency[]=[];

  ers=inject(ExchangeRateService)



}
