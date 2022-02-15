import { Image } from './../models/image';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css']
})
export class BienComponent implements OnInit {
  chambres:any;
  isvisibleBien = false;
  BienIsLoad = false;
  categoriesBien :any;
  validateFormBien!:FormGroup;
  chambre :any;
  maisons :any;
  private api = "http://127.0.0.1:8000/api";


  constructor(private dataService:DataService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.listeLogement()
    this.listeCategorie()
    this.listeMaison()
    this.listeChambre()
    
    this.validateFormBien = this.fb.group({
      prix:[null, [Validators.required]],
      description:[null, [Validators.required]],
      nbrOccupant:[null, [Validators.required]],
      image:[null],
      lieuLogement:[null, [Validators.required]],
      categories_id:[null, [Validators.required]],
    });


  }





  VersBien(){
    this.router.navigate(['/gestionBien']);
  }
  verspro(){
    this.router.navigate(['/gestionroprietaire']);

  }



  submitFormBien(): void {
    console.log('submit', this.validateFormBien.value);
  }

  openAjoutBIen(){
    this.isvisibleBien = true;
  }

  closeAjoutBien(){
    this.isvisibleBien = false;
  }



  listeLogement(){
    this.dataService.listeLogement().subscribe({
      next:response => {
        console.log(response);
        this.chambres = response;
      // this.router.navigate(['/login']);
      },
      error : errors =>{
        console.log(errors);

      }
    })
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.validateFormBien.value.image.setValue(file);
    }
  }



  AjoutBien(){
    var formData: any = new FormData();
    formData.append("img", this.validateFormBien.value.image);

    this.dataService.AjoutBien(this.validateFormBien.value.prix,this.validateFormBien.value.description,
        this.validateFormBien.value.nbrOccupant,formData,this.validateFormBien.value.lieuLogement,this.validateFormBien.value.categories_id).subscribe({
          next:response =>{
            console.log(response);

          },
          error:error =>{
            console.log(error);

          }

        })

  }


  listeCategorie(){
    this.dataService.listeCategorie().subscribe({
      next:response => {
        console.log(response);
        this.categoriesBien = response;
      // this.router.navigate(['/login']);
      },
      error : errors =>{
        console.log(errors);

      }
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

  listeMaison(){
    this.dataService.listeMaison().subscribe({
      next:response =>{
        console.log(response);
        this.maisons = response;
      },
      error:error =>{
        console.log(error);

      }
    })
  }



}
