/**
 * File name : restaurant.component.ts
 * @author Gitang Karnam
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';
import { AuthConfig } from 'angular2-jwt';

/**
 * Displays the restaurant detail page.
 */
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})

export class RestaurantComponent implements OnInit {
  id: number;
  private sub: any;

  /**
   * Constructor provides Http, AuthService and FlashMessagesService on object instantiation.
   * @constructor
   * @param {Http} _http
   * @param {AuthService} authService
   * @param {FlashMessagesService} flashMessage
   */
  constructor(private route: ActivatedRoute,
    private _http: Http,
    private authService: AuthService,
    private flashMessage: FlashMessagesService, ) { }

  data: any;
  user: JSON;
  showreview: boolean;
  menuurl: String;
  RestaurantDetails: JSON;
  Reviews = [];
  imageUrl1: String;
  imageUrl2: String;
  imageUrl3: String;
  logoUrl: String;
  username: String;
  userID: String;
  totalReviews;
  restaurantname: String;
  phone: String;
  Cusines: String;
  AverageCost: String;
  Address: String;
  Opening: String;
  Website: String;
  checkedin: boolean;
  selectedIndex: number;

  /**
   * Checks in the user in the current restaurant.
   */
  checked_in() {
    const rest1 = {
      'name': this.restaurantname,
      'id': this.id,
      'logoUrl': this.logoUrl
    };

    const user1 = {
      'name': this.username,
      'id': this.userID
    };

    const rating = {
      'restaurant': rest1,
      'user': user1,
    };

    this._http.post('http://localhost:3000/checkin/', rating
    ).subscribe(res => {
    });
    this.checkedin = false;
    alert('you have checked into ' + this.restaurantname);
  }

  /**
   * Inserts a review by a logged in user for the current restaurant.
   */
  Writeareview() {
    if (this.authService.loggedIn()) {
      this.showreview = true;
    } else {
      this.flashMessage.show('Please Login to write a review', {
        cssClass: 'alert-danger',
        timeout: 1000
      });
      this.showreview = false;
    }
  }

  /**
   * Inserts a rating and/or review by a logged in user for the current restaurant.
   * @param {String} review
   * @param {String} rate
   */
  submitreview(review, rate) {
    const rest1 = {
      'name': this.restaurantname,
      'id': this.id,
      'logoUrl': this.logoUrl
    };

    const user1 = {
      'name': this.username,
      'id': this.userID
    };

    const rating = {
      'restaurant': rest1,
      'user': user1,
      'value': rate,
      'review': review
    };

    this._http.post('http://localhost:3000/ratings/', rating
    ).subscribe(res => { });
    alert('Thank you for Rating!!!');
    window.location.reload();
  }

  /**
   * Displays information for the current restaurant and Review and Checkin buttons depending on whether the user is logged in
   */
  ngOnInit() {
    this.showreview = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    const resturl = 'http://localhost:3000/restaurants/restID/' + this.id;
    this._http.get(resturl).subscribe(res => {

      this.data = res.json();
      this.RestaurantDetails = this.data[0]._source;
      this.restaurantname = this.data[0]._source.name;
      this.logoUrl = this.data[0]._source.logoUrl;
      this.phone = this.data[0]._source.phoneNo;
      this.Address = this.data[0]._source.address;
      this.Cusines = this.data[0]._source.cuisine;
      this.Website = this.data[0]._source.website;
      this.AverageCost = this.data[0]._source.costInfo;
      this.Opening = this.data[0]._source.hours;

      this.menuurl = 'http://localhost:3000/' + this.data[0]._source.menuUrl;
      this.imageUrl1 = 'http://localhost:3000/' + this.RestaurantDetails['imageUrl'][0];
      this.imageUrl2 = 'http://localhost:3000/' + this.RestaurantDetails['imageUrl'][1];
      this.imageUrl3 = 'http://localhost:3000/' + this.RestaurantDetails['imageUrl'][2];
    });

    const reviewurl = 'http://localhost:3000/ratings/' + this.id;

    this._http.get(reviewurl).subscribe(res => {
      this.Reviews = [];
      this.data = res.json();
      this.totalReviews = res.json().length;
      this.data.forEach(element => {
        this.Reviews.push(element);
      });
    });


    if (this.authService.loggedIn()) {
      this.checkedin = false;
      const myStorage = window.localStorage;
      const userDetails = myStorage.getItem('user');
      this.user = JSON.parse(userDetails);
      this.userID = this.user['id'];
      this.username = this.user['name'];

      const url = 'http://localhost:3000/checkin/' + this.id + '/' + this.user['id'];

      this._http.get(url).subscribe(res => {
        this.data = res.json();
        if (this.data == 1) {
          this.checkedin = false;
        } else {
          this.checkedin = true;
        }
      });
    } else {
      this.checkedin = false;
    }
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
