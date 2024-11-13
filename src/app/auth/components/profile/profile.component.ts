import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  router = inject(Router);

  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('home');
  }

}
