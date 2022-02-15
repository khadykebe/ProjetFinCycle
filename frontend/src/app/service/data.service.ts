import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private api = "http://127.0.0.1:8000/api";

  constructor(private httpClient: HttpClient,private fb: FormBuilder) {  }

  private simpleHearder(){
    return{
      "accept":"application/json",
      "content-type":"application/json",

    }
  }

  guestHeaders(){
    const user:any = sessionStorage.getItem('user');
    const userObj = JSON.parse(user);
    const token = userObj.token;
    return{
      "accept":"application/json",
      "content-type":"application/json",
      'authorization': 'Bearer ' + token,

    }
  }


  // listeChambre(){
  //   return this.httpClient.get(this.api + '/all_maison', {
  //     headers: this.simpleHearder(),
  //     observe: "body"
  //   });
  // }


  login(email: string, password: string){
    return this.httpClient.post<any>(this.api + "/login", {
      email: email,
      password: password,
    })
  }

  CreerCompte(nom:string,prenom:string,telephone:string,adresse:string,email:string,password:string){
    return this.httpClient.post<any>(this.api + "/add_user",{
      nom:nom,
      prenom:prenom,
      telephone:telephone,
      adresse:adresse,
      email:email,
      password:password,

    },{
      headers: this.guestHeaders(),
      observe: "body"
    })
  }

  listeCategorie(){
    return this.httpClient.get(this.api +"/allcategorie",{
      headers: this.simpleHearder(),
      observe: "body"
    })
  }

  recherche(lieu:string,categorie:string){
    return this.httpClient.post<any>(this.api + "/recherche",{
      lieu:lieu,
      categorie:categorie,

    },{
      headers: this.simpleHearder(),
      observe: "body"
    })
  }

  listeLogement(){
    return this.httpClient.get(this.api + '/all_logement', {
      headers:this.guestHeaders(),
      observe: "body"
    });
  }



  AjoutBien(prix:String,description:String,nbrOccupant:BigInteger,image:File,lieuLogement:String,categories_id:BigInteger){
    return this.httpClient.post<any>(this.api + "/add_chambre",{
      prix:prix,
      description:description,
      nbrOccupant:nbrOccupant,
      lieuLogement:lieuLogement,
      image:image,
      categories_id:categories_id
    },{
      headers: this.guestHeaders(),
      observe: "body"
    })

  }

  openDetail(id:any){
    return this.httpClient.get(this.api + '/get_maison/'+id,{
      headers:this.guestHeaders(),
      observe:"body",
    })
  }
  listeRendervous(){
    return this.httpClient.get(this.api + '/listRV',{
      headers: this.simpleHearder(),
      observe: "body"
    })
  }

  prendreRV(id:any){
    return this.httpClient.delete(this.api + '/RV/' +id,{
      headers: this.simpleHearder(),
      observe: "body"
    })
  }

  userAuth(){
    return this.httpClient.get<any>(this.api + "/userAuth",{
      headers: this.guestHeaders(),
      observe: "body"
    })
  }


  listeChambre(){
    return this.httpClient.get(this.api + '/all_chambre', {
      headers: this.simpleHearder(),
      observe: "body"
    });
  }

  listeMaison(){
    return this.httpClient.get<any>(this.api + "/all_maison", {
      headers: this.simpleHearder(),
      observe: "body"
    });
  }
  allgerant(){
    return this.httpClient.get(this.api + '/allUser',{
      headers: this.guestHeaders(),
      observe: "body"
    })
  }



}
