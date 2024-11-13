import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { Router, RouterModule } from '@angular/router';

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
      next : ()=>{
        localStorage.setItem('token','123,abc,!#$');
        this.router.navigateByUrl('home');
      },
      error : (e : Error)=>{
        alert(e.message)
      }
    })
  }

}
