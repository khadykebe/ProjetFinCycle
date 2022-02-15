import { Component, OnInit } from '@angular/core';
import { DataService } from './../service/data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  user : any
  resultat : any;
  constructor(private dataservice:DataService) { }
    ngOnInit(){
      this.resultat =JSON.parse(sessionStorage.getItem('user')!);
      // console.log(this.resultat);
      this.userAuth();
    }
    userAuth(){
      this.dataservice.userAuth().subscribe({
        next:response =>{
          this.user = response
          // console.log(response);
        },
        error:error =>{
          console.log(error);
        }

      })
    }

}
