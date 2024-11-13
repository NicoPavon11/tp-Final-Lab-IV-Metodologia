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
        }
        return this.http.put<User>(`${this.urlBase}/${userId}`, user);
      })
    );
  }

  
}


