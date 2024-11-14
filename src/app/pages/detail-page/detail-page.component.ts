import { Component } from '@angular/core';
import { DetailCurrencyComponent } from "../../currency/components/detail-currency/detail-currency.component";

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [DetailCurrencyComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {

}
