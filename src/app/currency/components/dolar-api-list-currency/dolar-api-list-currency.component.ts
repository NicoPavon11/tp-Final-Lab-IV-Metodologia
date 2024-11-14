import { Component, inject, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../../service/exchange-rate.service';
import { Currency } from '../../../interface/currency.interface';

import { DolarApiCardCurrencyComponent } from '../dolar-api-card-currency/dolar-api-card-currency.component';

@Component({
  selector: 'app-dolar-api-list-currency',
  standalone: true,
  imports: [DolarApiCardCurrencyComponent],
  templateUrl: './dolar-api-list-currency.component.html',
  styleUrl: './dolar-api-list-currency.component.css'
})
export class DolarApiListCurrencyComponent implements OnInit{
  ngOnInit(): void {
    
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
  
  ers=inject(ExchangeRateService)
  dolarRates:Currency[]=[];
  otherRates:Currency[]=[];
}
