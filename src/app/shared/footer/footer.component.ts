import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

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

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Comprobar el token en localStorage
    const token = localStorage.getItem('token');
    if (token && token !== '123.abc.!#$') {
      this.textButton = 'Perfil';  // Si el token es válido, mostrar "Perfil"
      this.isLoggedIn = true;
    } else {
      this.textButton = 'LogIn';  // Si no hay token, mostrar "LogIn"
      this.isLoggedIn = false;
    }
  }

  toggleButton() {
    if (this.isLoggedIn) {
      // Redirigir al perfil
      // Aquí podrías navegar a la página de perfil, por ejemplo:
      // this.router.navigate(['/profile']);
      console.log('Ir al perfil');
    } else {
      // Redirigir al login
      // Aquí podrías navegar a la página de login, por ejemplo:
      // this.router.navigate(['/login']);
      console.log('Ir al login');
    }
  }


}
