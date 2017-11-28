
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from "@angular/common";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {
  MatAutocompleteModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'rxjs/add/operator/map';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import 'hammerjs';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from './app.module';
import { RestaurantComponent } from './restaurant/restaurant.component';




describe('AppComponent and Router', () => {

  var location: Location;
  var router: Router;
  var fixture;


  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SignupComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        RestaurantComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
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
        MatTabsModule,
        MatInputModule,
        FlashMessagesModule,
        RouterModule
      ],
      providers: [ValidateService, AuthService, AuthGuard, { provide: APP_BASE_HREF, useValue: '/' }]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    // router.initialNavigation();
  }));


  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })); 

  it('navigates to "home" redirects you to /home', fakeAsync(() => {
    router.navigateByUrl('');
    tick(50);
    expect(location.path()).toBe('/home');
  }));

  it('navigates to "login" redirects you to /login', fakeAsync(() => {
    router.navigate(['login']);
    tick(50);
    expect(location.path()).toBe('/login');
  }));

  it('navigates to "register" redirects you to /register', fakeAsync(() => {
    router.navigate(['register']);
    tick(50);
    expect(location.path()).toBe('/register');
  }));

  it('navigates to "restaurant" redirects you to /restaurant/3 with a restaurant id', fakeAsync(() => {
    router.navigate(['restaurant/3']);
    tick(50);
    expect(location.path()).toBe('/restaurant/3');
  }));
});
