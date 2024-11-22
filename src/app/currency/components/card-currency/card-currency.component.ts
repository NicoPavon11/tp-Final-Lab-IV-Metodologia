import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Currency } from '../../../interface/currency.interface';
import { UserServiceService } from '../../../service/user-service.service';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-currency',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-currency.component.html',
  styleUrl: './card-currency.component.css'
})
export class CardCurrencyComponent implements OnChanges{
  
  @Input() currencyERA!:{ code: string, name: string, rate: number }
  message:string="" //Mensaje para copyToClipboard

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currencyERA'] && this.currencyERA) {
      this.message = `El ${this.currencyERA.name} está cotizando a $${this.currencyERA.rate.toFixed(2)}. Fecha de la cotización: ${this.calcularFechaActual()}`;
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
  userId :string  | null= localStorage.getItem('userId');
  ruta=inject(Router)

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
