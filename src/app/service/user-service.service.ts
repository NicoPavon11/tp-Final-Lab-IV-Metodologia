import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  urlBase= 'http://localhost:3000/users'

  http = inject(HttpClient)
  
  addCurrencyToFavorites(userId: string|null, currency: string): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/${userId}`).pipe(
      switchMap((user) => {
        if (!user.favCurrencies.includes(currency)) {
          user.favCurrencies.push(currency);
          alert("La moneda fue agregada a favoritos con exito!")
        }else{
          alert("La moneda ya se encuentra en la lista de favoritos...")
        }
        return this.http.put<User>(`${this.urlBase}/${userId}`, user);
      })
    );
  }

  getUserById(id : string | null): Observable<User>{
    return this.http.get<User>(`${this.urlBase}/${id}`);
  }

  deleteCurrencyFromFavs(id : string | null, baseCode : string){
    return this.http.get<User>(`${this.urlBase}/${id}`).pipe(
      switchMap((user) =>{
        if(user.favCurrencies.includes(baseCode)){
          user.favCurrencies = user.favCurrencies.filter(currency => currency != baseCode);
        }
        return this.http.put<User>(`${this.urlBase}/${id}`,user);
      })
    )
  }

  
}


