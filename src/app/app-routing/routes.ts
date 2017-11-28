import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RestaurantComponent } from '../restaurant/restaurant.component';

/**
 * Routes file determines which page/component will be displayed for a particular URL route
 */
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'restaurant/:id', component: RestaurantComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
