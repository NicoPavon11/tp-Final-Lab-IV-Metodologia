import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  urlBase : string = 'http://localhost:3000/users';

  http = inject(HttpClient);

  estoyLogeado : boolean = false;

  logIn() : boolean{
    return this.estoyLogeado=true;
  }

  logOut() : boolean{
    return this.estoyLogeado = false;
  }

  login2(username: string, password:string): Observable<User>{
    return this.http.get<User>(`${this.urlBase}?username=${username}&password=${password}`)
  }

  register(user : User) :Observable<User>{
    return this.http.post<User>(this.urlBase,user);
  }

  

}
