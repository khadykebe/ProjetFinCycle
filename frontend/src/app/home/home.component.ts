import { LoginUser } from './../models/login-user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Categorie } from './../models/categorie';
import { User } from './../models/user';
import { Chambre } from './../models/chambre';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:any;
  user = new User();
  chambre :any;
  rechercheIsvisible = false;
  isvisibleC = false;
  isVisible = false;
  loginIsLoad = false;
  compteisload = false;
  detailVisible = false;
  resultat:any;
  gerant:any;
  Admin:any;

  constructor(private dataService:DataService, private fb: FormBuilder,private router:Router,private httpClient: HttpClient) {

  }

  validateForm!: FormGroup;
  validateFormC!:FormGroup;
  validaterecherche!:FormGroup;
  basic = '';
  message:any;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
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

    return this.httpClient.post<LoginUser>('http://127.0.0.1:8000/api/login',data,options).subscribe({
      next:res =>{
        sessionStorage.setItem('user',JSON.stringify(res));
        console.log(res.user.role);
        if(res.user.role =='gerant'){
          this.router.navigate(['/user']);
        }
        else if(res.user.role == 'Admin'){
        sessionStorage.setItem('user',JSON.stringify(res));

          this.router.navigate(['/admin']);
        }
        
      },
      error:error =>{
        console.log(error);
        this.message = error;

      }
    })

}

  submitFormREcherche(){
    console.log('submit', this.validaterecherche.value)
  }

  submitFormC(): void {
    console.log('submit', this.validateFormC.value);
  }


  ngOnInit(): void {
    this.listeChambre()
    this.listeCategorie()

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

    this.validaterecherche = this.fb.group({
      lieu:[null, [Validators.required]],
      categorie:[null, [Validators.required]],

    })

  }

  listeChambre(){
    this.dataService.listeChambre().subscribe({
      next:response =>{
        // console.log(response);
        this.chambre = response;
      },
      error:error =>{
        console.log(error);

      }
    })
  }

  openrecherche(){
    this.rechercheIsvisible = true;
  }

  closerecherche(){
    this.rechercheIsvisible = false;
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

  listeCategorie(){
    this.dataService.listeCategorie().subscribe({
      next:response => {
        console.log(response);
        this.categories = response;
      // this.router.navigate(['/login']);
      },
      error : errors =>{
        console.log(errors);

      }
    })
  }
  recherche(){
    this.dataService.recherche(this.validaterecherche.value.lieu,this.validaterecherche.value.categorie).subscribe({
      next:response => {
        // console.log(response);
        sessionStorage.setItem('resultat',JSON.stringify(response));
        this.router.navigate(['/resultat']);
      },
      error : errors =>{

        this.resultat = errors;

        // console.log(errors);

      }
    })
  }

  openDetail(){


  }

}

