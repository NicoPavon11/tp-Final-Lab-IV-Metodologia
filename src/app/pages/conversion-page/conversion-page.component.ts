import { Component } from '@angular/core';
import { ToolConversionComponent } from '../../conversion/components/tool-conversion/tool-conversion.component';

@Component({
  selector: 'app-conversion-page',
  standalone: true,
  imports: [ToolConversionComponent],
  templateUrl: './conversion-page.component.html',
  styleUrl: './conversion-page.component.css'
})
export class ConversionPageComponent {

}
