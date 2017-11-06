import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';


import {
  MatAutocompleteModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';

import { 
  Http, 
  Response, 
  Headers,
  HttpModule 
} from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';

import 'hammerjs';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    FlashMessagesModule,
    MatInputModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
