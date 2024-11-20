import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  
  textButton: string = 'LogIn';  // Valor por defecto
  isLoggedIn: boolean = false;   // Estado de login
  router = inject(Router);

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.textButton = this.isLoggedIn ? 'Perfil' : 'LogIn';
    // this.routerText = this.isLoggedIn ? 'profile' : 'login';
  }
  

  toggleButton() {
    if (this.isLoggedIn) {
      // Redirigir al perfil
      // Aquí podrías navegar a la página de perfil, por ejemplo:
      this.router.navigate(['/profile']);
      console.log('Ir al perfil');
    } else {
      // Redirigir al login
      // Aquí podrías navegar a la página de login, por ejemplo:
      this.router.navigate(['/login']);
      console.log('Ir al login');
    }
  }


}
