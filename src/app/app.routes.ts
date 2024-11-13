import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authGuardFn } from './auth/components/guard/auth.guard-fn';

export const routes: Routes = [
    {path : '' , redirectTo : 'home', pathMatch : 'full'},
    {path : 'home',component : HomePageComponent},
    {path : 'login' , component : LoginPageComponent},
    {path : 'register', component : RegisterPageComponent},
    {path : 'profile', component : ProfilePageComponent},
    // {path :'conversion'}, COMPLETAR
    // {path : 'detail/:moneda'} COMPLETAR
    // {path : 'compare'} COMPLETAR
    {path : '**' , redirectTo : '/home' , pathMatch :'full'}
    // AGREGAR UNA VISTA PARA ADMIN
];
