import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../service/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  resultat :any;
  user :any;
  toutGerant :any;
  isvisibleC:any;


  constructor(private dataService:DataService,private fb: FormBuilder,private router:Router) { }
  validateFormC!:FormGroup;

  submitFormC(): void {
    console.log('submit', this.validateFormC.value);
  }
  openCompteModul(){
    this.isvisibleC = true;
  }

  closeCompteModel(){
    this.isvisibleC = false;
  }
  ngOnInit(): void {
    this.resultat =JSON.parse(sessionStorage.getItem('user')!);
    this.allgerant()
    this.userAuth()

    this.validateFormC = this.fb.group({
      nom:[null, [Validators.required]],
      prenom:[null, [Validators.required]],
      telephone:[null, [Validators.required]],
      adresse:[null, [Validators.required]],
      email:[null, [Validators.required]],
      password:[null, [Validators.required]],
    })
  }

  allgerant(){
    this.dataService.allgerant().subscribe({
      next:res =>{
        console.log(res);
        this.toutGerant = res;

      },
      error:error =>{
        console.log(error);

      }
    })

  }
  userAuth(){
    this.dataService.userAuth().subscribe({
      next:response =>{
        this.user = response
        // console.log(response);
      },
      error:error =>{
        console.log(error);
      }

    })
  }
  CreerCompte(){
    console.log("CREER COMPTE",this.validateFormC.value);
    this.dataService.CreerCompte(this.validateFormC.value.nom,this.validateFormC.value.prenom,this.validateFormC.value.telephone,this.validateFormC.value.adresse,this.validateFormC.value.email,this.validateFormC.value.password).subscribe({
      next:response => {
        // console.log(response);

      this.router.navigate(['/login']);
      },
      error : errors =>{
        console.log(errors);

      }
    })

  }

}
