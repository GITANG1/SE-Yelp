/**
 * File name : login.component.ts
 * @author Adhiraj Nakhe
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { ValidateService } from '../services/validate.service';
import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

/**
 * Displays the login form to the user
 */
@NgModule({
  imports: [
    MatToolbarModule, MatFormFieldModule, MatCardModule, MatInputModule,
    FormControl
  ],
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;

  /**
   * Constructor provides FlashMessagesService, Router and AuthService on object instantiation.
   * @constructor
   * @param {FlashMessagesService} flashMessage
   * @param {AuthService} authService
   * @param {Router} router
   */
  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  /**
   * Checks if the user credentials are valid. If so, grants access to the user. If not, it throws an error message.
   */
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        window.location.href = '/home';
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        window.location.href = 'login';
      }
    });
  }

}
