import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatCardModule,MatInputModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    MatToolbarModule, MatFormFieldModule, MatCardModule,MatInputModule ,
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

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      document.getElementById('flashMessage').classList.remove('hide');
      this.flashMessage.show('Please fill in all fields', {timeout: 3000});
      return false;
    }

    // Validate Email
    if ( !this.validateService.validateEmail(user.email) ) {
      this.flashMessage.show('Please use a valid email', {timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Registration Successful!', {timeout: 3000});
         // TO-DO: Handle this message display in a better way in next iteration
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Username Already Exists!', {timeout: 3000});
      }
    });
  }
}
