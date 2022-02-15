import { Component, OnInit } from '@angular/core';
import { DataService } from './../service/data.service';


@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.css']
})
export class ProprietaireComponent implements OnInit {
  rendervous:any;
  AjoutRVIsvisible = false;
  constructor(private dataService:DataService) { }


  ngOnInit(){
    this.listRenderVouder();
  }

  openAjoutRV(){
    this.AjoutRVIsvisible = true;
  }

  closeAjoutRV(){
    this.AjoutRVIsvisible = false;
  }

  // prendreRV(id:any){
  //   this.dataService.prendreRV(id).subscribe(res =>{

  //       if(res){
  //         Swal.fire({
  //           icon: "success",
  //           title:"Merci votre Render-vous atait bien prise en charge"
  //         })
  //         setTimeout(() => {
  //           window.location.reload()
  //         }, 3000);
  //       }
  //         this.rendervous = res;
  //         //this.router.navigate(['/']);
  //     },

  //   )
  // }

  listRenderVouder(){
    this.dataService.listeRendervous().subscribe({
      next:response =>{
        console.log(response);
        this.rendervous = response;

      },
      error:error =>{
        console.log(error);

      }
    })
  }

  addRv(){

  }

}
