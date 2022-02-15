import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  isVisible = false;
  resultat:any;
  isvisibleC = false;
  loginIsLoad = false;
  compteisload = false;

  constructor(private dataService:DataService, private fb: FormBuilder,private router:Router,private httpClient: HttpClient) { }
  validateForm!: FormGroup;
  validateFormC!:FormGroup;

  basic = '';
  message:any;
  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  submitFormC(): void {
    console.log('submit', this.validateFormC.value);
  }

  ngOnInit(): void {

    this.resultat =JSON.parse(sessionStorage.getItem('user')!);
    console.log(this.resultat);

    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });

    this.validateFormC = this.fb.group({
      nom:[null, [Validators.required]],
      prenom:[null, [Validators.required]],
      telephone:[null, [Validators.required]],
      adresse:[null, [Validators.required]],
      email:[null, [Validators.required]],
      password:[null, [Validators.required]],
    })

  }


  openLoginModal(){
    this.isVisible = true;
  }

  openCompteModul(){
    this.isvisibleC = true;
  }

  closeCompteModel(){
    this.isvisibleC = false;
  }
  closeLoginModal(){
    this.isVisible = false;
  }


  onSubmit(form:FormGroup){
    this.loginIsLoad = true;
    const email = form.value.email;
    const password = form.value.password;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
    let options = { headers: headers };
    const data= {
    "email":email,
    "password":password
    }

    return this.httpClient.post('http://127.0.0.1:8000/api/login_client',data,options)
        .subscribe(
            res =>{
                sessionStorage.setItem('user',JSON.stringify(res));
                this.loginIsLoad = false;
                console.log(res);
                this.router.navigate(['/espaceClient']);

            },
            err => {
              this.message = err;
            }
        );
}

CreerCompte(){
  console.log("CREER COMPTE",this.validateFormC.value);
  this.compteisload = true;
  this.dataService.CreerCompte(this.validateFormC.value.nom,this.validateFormC.value.prenom,this.validateFormC.value.telephone,this.validateFormC.value.adresse,this.validateFormC.value.email,this.validateFormC.value.password).subscribe({
    next:response => {
      // console.log(response);

    this.compteisload = false;
    this.router.navigate(['/login']);
    },
    error : errors =>{
      console.log(errors);
      this.compteisload = false;

    }
  })

}






}
