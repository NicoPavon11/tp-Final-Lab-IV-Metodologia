import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyERA } from '../interface/currency-era';
import { Currency } from '../interface/currency.interface';
import { EnrichedCurrency } from '../interface/currency-enriched-era.interface';


@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  http=inject(HttpClient)

  private apiKey: string = '007bc47fd6e7740cb8d342eb';  // Tu clave API
  private apiUrl: string = 'https://v6.exchangerate-api.com/v6';  // URL base de la API

  private urlDolarApi:string="https://dolarapi.com/v1/dolares";
  private urlDolarApi2:string="https://dolarapi.com/v1/cotizaciones";

  // Método para obtener las tasas de cambio
  getExchangeRates(baseCurrency:string): Observable<CurrencyERA> {
    return this.http.get<CurrencyERA>(`${this.apiUrl}/${this.apiKey}/latest/${baseCurrency}`);  // Realiza la petición GET
  }

  getDolarRates(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.urlDolarApi)
  }

  getOtherRates(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.urlDolarApi2)
  }

  // Convertir entre dos monedas específicas
  convert(from: string, to: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/pair/${from}/${to}`);
  }

  getDetails(baseCode : string | null) : Observable<EnrichedCurrency>{
    return this.http.get<EnrichedCurrency>(`/api/v6/${this.apiKey}/enriched/ARS/${baseCode}`);
  }

  
}
