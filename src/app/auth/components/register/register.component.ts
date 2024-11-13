import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  fb = inject(FormBuilder);

  authService = inject(AuthServiceService);

  router = inject(Router)

  formulario = this.fb.nonNullable.group({
    username : ['',Validators.required],
    password : ['',Validators.required],

  });

  register(){
    if(this.formulario.invalid) return ;

    // const user = this.formulario.getRawValue();

    const user = {
      ...this.formulario.getRawValue(),
      favCurrencies: [] ,rol : 'user'// Inicializado como array vacío
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
