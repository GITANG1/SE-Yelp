/**
 * File name : profile.component.ts
 * @author Srishti Hunjan
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { MatTabChangeEvent } from '@angular/material';

/**
 * Displays the user profile page to the logged in user
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: JSON;
  name: FormControl = new FormControl();
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  reviews: number;
  checkins: number;
  reviewData: any;
  reviewResults = [];
  checkinData: any;
  checkinResults = [];
  sessionToken: any;
  selectedIndex: number;

  /**
   * Constructor provides AuthService, Router, HTTP and FlashMessagesService on object instantiation.
   * @constructor
   * @param {AuthService} authService
   * @param {Router} router
   * @param {Http} _http
   * @param {FlashMessagesService} flashMessage
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private _http: Http,
    private flashMessage: FlashMessagesService,
  ) { }

  /**
   * On initialization of the page, it retrives all the ratings and checkins inserted by the logged in user
   * from the database and displays it
   */
  ngOnInit() {
    const myStorage = window.localStorage;
    const userDetails = myStorage.getItem('user');
    this.sessionToken = myStorage.getItem('id_token');
    this.user = JSON.parse(userDetails);

    const ratingByUser = 'http://localhost:3000/ratings/byUser/' + this.user['id'];
    this._http.get(ratingByUser, null
    ).subscribe(res => {
      if (res) {
        this.reviews = res.json().length > 0 ? res.json().length : 0;
      } else {
        this.reviews = 0;
      }
      this.reviewData = res.json();
      this.reviewResults = [];
      this.reviewData.forEach(element => {
        this.reviewResults.push(element);
      });
    });

    const checkinsByUser = 'http://localhost:3000/checkin/' + this.user['id'];
    this._http.get(checkinsByUser, null
    ).subscribe(res => {
      if (res) {
        this.checkins = res.json().length > 0 ? res.json().length : 0;
      } else {
        this.checkins = 0;
      }

      this.checkinData = res.json();
      this.checkinResults = [];
      this.checkinData.forEach(element => {
        this.checkinResults.push(element);
      });
    });

    this.selectedIndex = 0;
  }

  /**
   * Updates the user information as per the new details provided by the user
   * @param {String} name
   * @param {String} email
   * @param {String} password
   */
  updateUserInfo(name, email, password) {
    if (password) {
      password = password.length > 0 ? password : '';
    } else {
      password = '';
    }
    const updatedUser = { "id": this.user['id'], "name": name, "email": email };
    this._http.put('http://localhost:3000/users/update', updatedUser
    ).subscribe(res => {
      this.flashMessage.show('Profile Updated Sucessfully!', {
        cssClass: 'alert-danger',
        timeout: 1000
      });
      this.authService.storeUserData(this.sessionToken, updatedUser);
      window.location.reload();
    });
  }

  /**
   * Calculates the rating percentage of as per the numerical value of rating given by user
   * to show as a fraction of a total of 5 stars.
   * @param {number} rating
   */
  getStars(rating) {
    const val = parseFloat(rating);
    const size = val / 5 * 100;
    return size + '%';
  }

  /**
   * Selects the tab as per the index passed to it.
   * @param {number} val
   */
  selectedIndexChange(val) {
    this.selectedIndex = val;
    console.log('*** val => ', val);
  }
}
