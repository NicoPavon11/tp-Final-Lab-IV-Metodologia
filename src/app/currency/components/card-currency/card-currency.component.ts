import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Currency } from '../../../interface/currency.interface';
import { UserServiceService } from '../../../service/user-service.service';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import { CurrencyEraHistorical } from '../../../interface/currency-era-historical';
import { ExchangeRateService } from '../../../service/exchange-rate.service';


@Component({
  selector: 'app-card-currency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-currency.component.html',
  styleUrl: './card-currency.component.css'
})
export class CardCurrencyComponent implements OnChanges, OnInit{
  
  ngOnInit(): void {
    console.log("card123" + this.tasaHistorica);
  }
  @Input() currencyERA!:{ code: string, name: string, rate: number }
  message:string="" //Mensaje para copyToClipboard
  @Input() tasaHistorica?: number;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currencyERA'] && this.currencyERA) {
      this.message = `El ${this.currencyERA.name} está cotizando a $${this.currencyERA.rate.toFixed(2)}. Fecha de la cotización: ${this.calcularFechaActual()}`;
    }
  
    if (changes['tasaHistorica'] && this.tasaHistorica !== undefined) {
      this.conversion = 1 / this.tasaHistorica;
      this.variacion = this.getVariacion();
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

  userService = inject(UserServiceService);
  currencyService = inject(ExchangeRateService);
  userId :string  | null= localStorage.getItem('userId');
  ruta=inject(Router)
  historicalData : CurrencyEraHistorical[] = [];
  fecha : Date = new Date();
  conversion: number | null = this.tasaHistorica ? 1 / this.tasaHistorica : null;
  variacion : number = this.getVariacion();



  addFav(){
    if(this.userId===null){
      this.routearToLogin();
    }
    this.userService.addCurrencyToFavorites(this.userId,this.currencyERA.code).subscribe({
      next : () =>{
        console.log('añadido');
      },
      error : (e : Error) =>{
        console.log(e.message);
      }
    })
  }

  // showChart(baseCode : string){
  //   console.log("funcaaaa" + baseCode);
  //   console.log(this.historicalData);
  // }

  // getHistoricalData(){
  //   const fecha = new Date();
  //   const limite = new Date(fecha);
  //   limite.setMonth(fecha.getMonth()-3);
  //   console.log(fecha);
  //   console.log(limite);
  //   let aux = new Date(limite);
  //   while(aux <= fecha){
      
  //     console.log(limite);

  //     this.currencyService.getHistoricalData(aux.getDate(), aux.getMonth() + 1, aux.getFullYear()).subscribe({
  //       next : (response) =>{
  //         this.historicalData.push(response)
  //       },
  //       error : (e : Error) =>{
  //         console.log(e.message);
  //       }
  //     })
  //     aux.setDate(aux.getDate()+1);
  //   }
  // }

  getVariacion(): number {
    if (!this.currencyERA || this.tasaHistorica === undefined) return 0;
    const tasaHistoricaConvertida = 1/this.tasaHistorica;
    return ((this.currencyERA.rate - tasaHistoricaConvertida) / tasaHistoricaConvertida) * 100;
  }

  calcularFechaActual() {
    const now = new Date();
    const formattedDate = format(now, "dd/MM/yyyy 'a las' HH:mm:ss")
    return formattedDate;
  }

  routearToDetail(code:string){
    this.ruta.navigate([`detail/${code}`])
  }

  routearToConversion(code:string){
    this.ruta.navigate([`conversion/${code}`])
  }

  routearToLogin(){
    this.ruta.navigate([`login`])
  }
}
