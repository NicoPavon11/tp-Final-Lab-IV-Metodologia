import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interface/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  authService = inject(AuthServiceService);

  router = inject(Router)

  login() {
    if (this.formulario.invalid) return;

    const user = this.formulario.getRawValue()

    this.authService.login2(user.username, user.password).subscribe({
      next: (response) => {
        if (response.length > 0) {
          const loggedUser = response[0];
          const userId = loggedUser.id;

          if (userId) {
            localStorage.setItem('userId', userId);  // Solo guardar si el id está definido
            this.authService.logIn;
            localStorage.setItem('token', '123,abc,!#$');
            this.router.navigateByUrl('home');
          } else {
            alert('El id del usuario no está disponible');
          }

        } else {
          alert('Username y/o Contraseña invalidos')
        }


      },
      error: (e: Error) => {
        alert(e.message)
      }
    })
  }

}
