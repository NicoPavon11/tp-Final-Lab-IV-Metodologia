import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  router = inject(Router);
  authService = inject(AuthServiceService);
  logOut(){
    this.authService.logOut;
    localStorage.removeItem('token');
    this.router.navigateByUrl('home');
  }

}
