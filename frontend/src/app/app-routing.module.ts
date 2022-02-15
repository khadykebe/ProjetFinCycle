import { EtudiantComponent } from './etudiant/etudiant.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RechercheComponent } from './recherche/recherche.component';
import { LocationComponent } from './location/location.component';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { BienComponent } from './bien/bien.component';
import { GerantComponent } from './gerant/gerant.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'espaceClient',component:ClientComponent},
  {path:'espaceGerant',component:GerantComponent},
  {path:'gestionBien',component:BienComponent},
  {path:'liste_rendez-vous',component:ProprietaireComponent},
  {path:'location',component:LocationComponent},
  {path:'resultat',component:RechercheComponent},
  {path:'admin',component:AdminComponent},
  {path:'proietaire',component:ProprietaireComponent},
  {path:'user',component:UserComponent},
  {path:'gestionEtudaint',component:EtudiantComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
