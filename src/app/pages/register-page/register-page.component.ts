import { Component } from '@angular/core';
import { RegisterComponent } from '../../auth/components/register/register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
