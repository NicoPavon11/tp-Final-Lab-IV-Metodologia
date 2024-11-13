import { Component } from '@angular/core';
import { ListCurrencyComponent } from "../../currency/components/list-currency/list-currency.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ListCurrencyComponent, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
