import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../service/auth-service.service';
import { User } from '../../../interface/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  ngOnInit(): void {
    this.userData();
  }

  user : User | null = null; 
  idUser = localStorage.getItem('userId');
  router = inject(Router);
  authService = inject(AuthServiceService);
  logOut(){
    this.authService.logOut;
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    this.router.navigateByUrl('home');
  }

  userData(){
    this.authService.getUserById(this.idUser).subscribe({
      next : (usuario : User) =>{
        this.user = usuario;
      },
      error : (e : Error) =>{
        console.log(e.message);
      }
    })
  }

}
