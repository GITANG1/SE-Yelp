/**
 * File name : register.component.ts
 * @author Srishti Hunjan
 */
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { Router } from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

/**
 * Displays the user registration page to the user
 */
@NgModule({
  imports: [
    MatToolbarModule, MatFormFieldModule, MatCardModule, MatInputModule,
    FormControl
  ],
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  /**
   * Constructor provides ValidateService, FlashMessagesService, AuthService and Router on object instantiation.
   * @constructor
   * @param {ValidateService} validateService
   * @param {FlashMessagesService} flashMessage
   * @param {AuthService} authService
   * @param {Router} router
   */
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  /**
   * Inserts a user with valid data into the database
   */
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Check for mandatory Fields
    if (!this.validateService.validateRegister(user)) {
      document.getElementById('flashMessage').classList.remove('hide');
      this.flashMessage.show('Please fill in all fields', { timeout: 3000 });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', { timeout: 3000 });
      return false;
    }

    // Register user with valid data
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Registration Successful!', { timeout: 3000 });
        window.location.href = '/login';
      } else {
        this.flashMessage.show('Username Already Exists!', { timeout: 3000 });
      }
    });
  }
}
