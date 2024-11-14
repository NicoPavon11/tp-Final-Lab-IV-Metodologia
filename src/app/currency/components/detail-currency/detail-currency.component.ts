import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateService } from '../../../service/exchange-rate.service';
import { CurrencyERA } from '../../../interface/currency-era';
import { EnrichedCurrency } from '../../../interface/currency-enriched-era.interface';

@Component({
  selector: 'app-detail-currency',
  standalone: true,
  imports: [],
  templateUrl: './detail-currency.component.html',
  styleUrl: './detail-currency.component.css'
})
export class DetailCurrencyComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  code: string | null = "";
  exchangeRate = inject(ExchangeRateService);
  currency :EnrichedCurrency | null = null;
  symbol: string | null = null;

// En algún método o en el ngOnInit, una vez que `this.currency` esté cargado



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.code = params.get('moneda')
        console.log("bsecode " + this.code);
        if(this.code){
          this.getDetalles();
        }else{
          console.log('no hay');
        }
      },
      error : (e : Error) =>{
        console.log(e.message);
      }
    })
    
  }

  getDetalles() {
    this.exchangeRate.getDetails(this.code).subscribe({
      next: (curr: EnrichedCurrency) => {
        console.log(curr);
        this.currency = curr;
        // console.log(this.currency);
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  }

}
