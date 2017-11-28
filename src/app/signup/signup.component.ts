/**
 * File name : signup.component.ts
 * @author Srishti Hunjan
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module';

/**
 * Shows navigation tabs depending on whether the user is signed in or not
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  /**
   * Constructor provides AuthService, Router and FlashMessagesService on object instantiation.
   * @constructor
   * @param {AuthService} authService
   * @param {Router} router
   * @param {FlashMessagesService} flashMessage
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() { }

  /**
   * Logs out a logged in user
   */
  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out!', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
