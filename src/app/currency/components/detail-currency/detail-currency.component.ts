import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-currency',
  standalone: true,
  imports: [],
  templateUrl: './detail-currency.component.html',
  styleUrl: './detail-currency.component.css'
})
export class DetailCurrencyComponent implements OnInit{
  activatedRoute=inject(ActivatedRoute);
  code:string | null="";

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.code=params.get("code")
        console.log(this.code);
      }
    })
  }

}
