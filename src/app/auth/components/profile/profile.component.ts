import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../service/auth-service.service';
import { User } from '../../../interface/user.interface';
import { UserServiceService } from '../../../service/user-service.service';
import { id } from 'date-fns/locale';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  idUser: string | null = '';
  router = inject(Router);
  authService = inject(AuthServiceService);
  userService = inject(UserServiceService);
  monedasFav : string[] = [];
  
  ngOnInit(): void {
    this.idUser = localStorage.getItem('userId');
    this.userData();
  }



  logOut() {
    this.authService.logOut;
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    this.router.navigateByUrl('home');
  }


  userData() {
    this.authService.getUserById(this.idUser).subscribe({
      next: (usuario: User) => {
        this.user = usuario;
        this.monedasFav = [...usuario.favCurrencies];
      },
      error: (e: Error) => {
        console.log(e.message);
      }
    })
  }

  listarFavs() {
    this.monedasFav = [];
    if (this.user && this.user.favCurrencies.length > 0) {
      this.user.favCurrencies.forEach(item => {
        this.monedasFav.push(item);
      })
    }
  }

  eliminarFav(baseCode : string){
    this.userService.deleteCurrencyFromFavs(this.idUser,baseCode).subscribe({
      next : ()=>{
        console.log("se elimina");
        this.userData()
      },
      error : (e : Error) =>{
        console.log(e.message);
      }
    })
  }



}
