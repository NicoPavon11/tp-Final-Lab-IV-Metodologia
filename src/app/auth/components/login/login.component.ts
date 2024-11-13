import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interface/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{


  fb = inject(FormBuilder);

  formulario = this.fb.nonNullable.group({
    username : ['',Validators.required],
    password : ['',Validators.required]
  });

  authService = inject(AuthServiceService);

  router = inject(Router)

  login(){
    if(this.formulario.invalid) return;

    const user = this.formulario.getRawValue()
    
    this.authService.login2(user.username,user.password).subscribe({
      next : (response)=>{
      if(response.length > 0){
        const loggedUser = response[0]; 
        const userId = loggedUser.id;
        
        if (userId) {
          localStorage.setItem('userId', userId);  // Solo guardar si el id está definido
        } else {
          alert('El id del usuario no está disponible');
        }
        
      }

      

        this.authService.logIn;
        localStorage.setItem('token','123,abc,!#$');
        this.router.navigateByUrl('home');
      },
      error : (e : Error)=>{
        alert(e.message)
      }
    })
  }

}
