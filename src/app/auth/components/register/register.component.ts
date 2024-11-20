import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  fb = inject(FormBuilder);

  authService = inject(AuthServiceService);

  router = inject(Router)

  formulario = this.fb.nonNullable.group({
    username : ['',[Validators.required,Validators.minLength(4)]],
    password : ['',[Validators.required, Validators.minLength(8)]]
  });

  register(){
    if(this.formulario.invalid) return ;


    const user = {
      ...this.formulario.getRawValue(),
      favCurrencies: [] ,rol : 'user'
    };

    this.authService.register(user).subscribe({
      next : () =>{
        alert('Usuario creado exitosamente');
        this.router.navigateByUrl('login')
      },
      error : (e : Error)=>{
        console.log(e.message);
      }
    })
  }


}
