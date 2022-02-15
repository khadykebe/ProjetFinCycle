import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { GerantComponent } from './gerant/gerant.component';
import { CompteComponent } from './users/compte/compte.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import fr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProprietaireComponent } from './proprietaire/proprietaire.component';
import { BienComponent } from './bien/bien.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LocationComponent } from './location/location.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { EtudiantComponent } from './etudiant/etudiant.component';


registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    GerantComponent,
    CompteComponent,
    LoginComponent,
    HomeComponent,
    ProprietaireComponent,
    BienComponent,
    LocationComponent,
    RechercheComponent,
    AdminComponent,
    UserComponent,
    EtudiantComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzDividerModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzIconModule,



  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent],
})
export class AppModule {}
