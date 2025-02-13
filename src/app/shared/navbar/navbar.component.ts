import { Component, inject, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { ColorThemeService } from '../../service/color-theme.service';

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
themeService= inject(ColorThemeService);

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

toggleDarkMode(){
  this.themeService.toggleTheme();
}

}
