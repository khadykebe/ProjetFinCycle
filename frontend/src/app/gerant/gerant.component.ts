import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerant',
  templateUrl: './gerant.component.html',
  styleUrls: ['./gerant.component.css']
})
export class GerantComponent implements OnInit {

  public canvas : any;
  public ctx:any;
  public chartColor:any;
  public chartEmail:any;
  public chartHours:any;
  resultat: any;
  constructor(private dataService:DataService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.resultat =JSON.parse(sessionStorage.getItem('resultat')!);
    console.log(this.resultat);

  }

  VersBien(){
    this.router.navigate(['/gestionBien']);
  }
  verspro(){
    this.router.navigate(['/gestionroprietaire']);

  }

}
