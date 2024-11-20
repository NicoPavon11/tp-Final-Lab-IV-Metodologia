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
  conversionPeso :undefined| number=0;
  fechaCotizacion : string | null = null;



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
        if(curr !== undefined){
          this.conversiones(curr)
        }
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  }


  convertirAPeso(curry : EnrichedCurrency){
    if (curry.conversion_rate !== undefined){
      this.conversionPeso = parseFloat((1/curry.conversion_rate).toFixed(2))
    }
  }

  convertirSimbolo(curry : EnrichedCurrency){
    if(curry.target_data?.display_symbol !== undefined){
      this.symbol = String.fromCharCode(parseInt(curry.target_data.display_symbol,16))
    }
  }

  convertirFecha(curry : EnrichedCurrency){
    if (curry.time_last_update_unix) {
      const timestamp = curry.time_last_update_unix * 1000;
      const date = new Date(timestamp);

      this.fechaCotizacion = date.toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
  }


  //Funcion que encapsula las 3 conversiones necesarias(fecha,cotizacion y simbolo)
  conversiones(curry : EnrichedCurrency){
    this.convertirAPeso(curry);
    this.convertirSimbolo(curry);
    this.convertirFecha(curry);
  }

}
