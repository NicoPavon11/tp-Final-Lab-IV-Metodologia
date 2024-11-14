import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authGuardFn } from './auth/components/guard/auth.guard-fn';
import { authGuardFnLogOut } from './auth/components/guard/auth.guard-fn-logout';
import { ConversionPageComponent } from './pages/conversion-page/conversion-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

export const routes: Routes = [
    {path : '' , redirectTo : 'home', pathMatch : 'full'},
    {path : 'home',component : HomePageComponent},
    {path : 'login' , component : LoginPageComponent, canActivate : [authGuardFnLogOut]},
    {path : 'register', component : RegisterPageComponent,canActivate : [authGuardFnLogOut]},
    {path : 'profile', component : ProfilePageComponent,canActivate : [authGuardFn]},
    {path :'conversion', component:ConversionPageComponent}, 
    {path : 'detail/:moneda', component:DetailPageComponent},
    // {path : 'compare'} COMPLETAR
    {path : '**' , redirectTo : '/home' , pathMatch :'full'}
    // AGREGAR UNA VISTA PARA ADMIN
];
