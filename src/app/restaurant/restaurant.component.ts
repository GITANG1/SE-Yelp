import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  id: number;
  private sub: any;

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

  checked_in() {
    var rest1 = {
      "name": this.restaurantname,
      "id": this.id,
      "logoUrl": this.logoUrl
    };

    var user1 = {
      "name": this.username,
      "id": this.userID
    };

    var rating = {
      "restaurant": rest1,
      "user": user1,
    };

    this._http.post('http://localhost:3000/checkin/', rating
    ).subscribe(res => {

      console.log("*******data*******");
    });
    this.checkedin = false;
    alert("you have checked into " + this.restaurantname);

  }


  Writeareview() {

    // this.showreview = true;   
    if (this.authService.loggedIn()) {
      this.showreview = true;
    }
    else {
      this.flashMessage.show('Please Login to write a review', {
        cssClass: 'alert-danger',
        timeout: 1000
      });


      this.showreview = false;
    }
  }



  submitreview(review, rate) {
    var rest1 = {
      "name": this.restaurantname,
      "id": this.id,
      "logoUrl": this.logoUrl
    };

    var user1 = {
      "name": this.username,
      "id": this.userID
    };

    var rating = {
      "restaurant": rest1,
      "user": user1,
      "value": rate,
      "review": review
    };

    console.log(rating);

    this._http.post('http://localhost:3000/ratings/', rating

    ).subscribe(res => {

      console.log("*******data*******");
    });
    alert("Thankyou for Rating!!!")
    window.location.reload();

  }

  ngOnInit() {
    this.showreview = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log("this is the restaurant id :" + this.id);

      //  this.checkedin = true;
    });

    var resturl = "http://localhost:3000/restaurants/restID/" + this.id;
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

      this.menuurl = "http://localhost:3000/" + this.data[0]._source.menuUrl;
      console.log(this.data[0]._source.menuUrl);
      this.imageUrl1 = "http://localhost:3000/" + this.RestaurantDetails["imageUrl"][0];
      this.imageUrl2 = "http://localhost:3000/" + this.RestaurantDetails["imageUrl"][1];
      this.imageUrl3 = "http://localhost:3000/" + this.RestaurantDetails["imageUrl"][2];
    });


    var reviewurl = "http://localhost:3000/ratings/" + this.id;

    this._http.get(reviewurl).subscribe(res => {
      this.Reviews = [];
      this.data = res.json();
      this.totalReviews = res.json().length;
      this.data.forEach(element => {
        this.Reviews.push(element);
        console.log(this.Reviews[0]._source.review);
      });

    });


    if (this.authService.loggedIn()) {

      this.checkedin = false;
      const myStorage = window.localStorage;
      const userDetails = myStorage.getItem('user');
      this.user = JSON.parse(userDetails);
      this.userID = this.user['id'];
      this.username = this.user['name'];
      console.log(this.user['id']);
      console.log(this.user['name']);

      var url = 'http://localhost:3000/checkin/' + this.id + '/' + this.user['id'];
      console.log("******get request url is: " + url);

      this._http.get(url).subscribe(res => {

        this.data = res.json();
        console.log("******the user checkin value*****")
        console.log(this.data);
        if (this.data == 1) {
          this.checkedin = false;
        }
        else {
          this.checkedin = true;
        }
        console.log(this.data);
      });

    }
    else {
      this.checkedin = false;
    }



  }




}
