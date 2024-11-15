import { Component, inject, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
ngOnInit(): void {
  this.updateBtn()
}
textButton : String = 'LogIn'
authservice = inject(AuthServiceService);
router = inject(Router)
ruta : string = 'login'

// onLogInLogOut(){
//   if(!localStorage.getItem('token')){
  
//     this.router.navigateByUrl('/login');
  
//   }else{
    
//     this.router.navigateByUrl('/profile')

//   }
//   this.updateBtn();
// }


updateBtn(){
  if(!localStorage.getItem('token')){
    this.textButton = 'LogIn'
    this.ruta = 'login'

  }else{
    this.textButton = 'Perfil'
    this.ruta ='profile'
 
  }
}

}
