import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { ValidateService } from '../services/validate.service';
import { MatToolbarModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';

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

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['home']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.router.navigate(['login']);
      }
    });
  }

}
