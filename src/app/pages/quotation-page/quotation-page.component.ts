import { Component } from '@angular/core';
import { DolarApiListCurrencyComponent } from '../../currency/components/dolar-api-list-currency/dolar-api-list-currency.component';

@Component({
  selector: 'app-quotation-page',
  standalone: true,
  imports: [DolarApiListCurrencyComponent],
  templateUrl: './quotation-page.component.html',
  styleUrl: './quotation-page.component.css'
})
export class QuotationPageComponent {

}
