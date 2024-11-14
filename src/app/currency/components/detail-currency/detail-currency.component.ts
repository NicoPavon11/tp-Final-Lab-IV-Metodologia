import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateService } from '../../../service/exchange-rate.service';
import { CurrencyERA } from '../../../interface/currency-era';

@Component({
  selector: 'app-detail-currency',
  standalone: true,
  imports: [],
  templateUrl: './detail-currency.component.html',
  styleUrl: './detail-currency.component.css'
})
export class DetailCurrencyComponent implements OnInit{
  activatedRoute=inject(ActivatedRoute);
  code:string | null="";
  exchangeRate = inject(ExchangeRateService);


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.code=params.get("moneda")
        console.log(this.code);
        // this.getDetalles();
      }
    })
    
  }

  getDetalles(){
    this.exchangeRate.getDetails(this.code).subscribe({
      next : (currency : CurrencyERA)=>{
        console.log(currency);
      },
      error : (e : Error) =>{
        console.log(e.message);
      }
    })
  }

}
