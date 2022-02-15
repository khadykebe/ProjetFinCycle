import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  rendervous : any;
  confirmModal?: NzModalRef;

  constructor(private dataService:DataService,private modal: NzModalService) { }

  ngOnInit(): void {
    this.listRenderVouder();
  }

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

  prendreRV(id:any){
    this.dataService.prendreRV(id).subscribe(res =>{

        if(res){
          Swal.fire({
            icon: "success",
            title:"Merci votre Render-vous atait bien prise en charge"
          })
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }
          this.rendervous = res;
          //this.router.navigate(['/']);
      },

    )
  }
  


}
