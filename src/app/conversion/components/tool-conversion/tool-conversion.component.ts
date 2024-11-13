import { Component, inject, OnInit } from '@angular/core';
import { CurrencyERA } from '../../../interface/currency-era';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ExchangeRateService } from '../../../service/exchange-rate.service';

@Component({
  selector: 'app-tool-conversion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tool-conversion.component.html',
  styleUrl: './tool-conversion.component.css'
})
export class ToolConversionComponent implements OnInit {
  baseCurrency: string = 'USD'
  targetCurrency: string = 'ARS';
  amount: number = 0;
  convertedAmount: number | null = null;
  currencykeys:string[]=[]

  

  ngOnInit(): void {
    this.ers.getExchangeRates("ARS").subscribe({
      next:(response:CurrencyERA)=>{
        this.currencykeys=Object.keys(response.conversion_rates)
      }
    })

  }

  convertCurrency(): void {
    this.ers.convert(this.baseCurrency, this.targetCurrency).subscribe((data) => {
      const rate = data.conversion_rate;
      this.convertedAmount = this.amount * rate;
    });
  }


  fb=inject(FormBuilder)
  ers=inject(ExchangeRateService)

}