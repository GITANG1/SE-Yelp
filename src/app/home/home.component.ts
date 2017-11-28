/**
 * File name : home.component.ts
 * @author Gitang Karnam
 */

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Displays the search bar for the user to search restaurants by type and/or location
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@NgModule({
  imports: [
    FormsModule
  ],
})

export class HomeComponent implements OnInit {

  cityname = '';
  restaurant: FormControl = new FormControl();
  options = [];
  filteredRestaurants: Observable<string[]>;
  location: FormControl = new FormControl();
  locations = [];
  filteredLocations: Observable<string[]>;
  data: any;
  DisplayRests = [];

  /**
   * Constructor provides Http and Router on object instantiation.
   * @constructor
   * @param {Http} http
   * @param {Router} router
   */
  constructor(
    private _http: Http,
    private router: Router
  ) { }

  /**
   * Redirects to the restaurant detail page that the user clicked on.
   * @param {String} id
   */
  navigate(id) {
    this.router.navigate(['restaurant/' + id]);
  }

  /**
   * Displays a list of restaurants based on the restaurant name and area that the user enters.
   * @param {String} restaurantname
   * @param {String} area
   */
  SearchRestaurants(restaurantname, area) {
    this._http.post('http://localhost:3000/restaurants/search', { 'search': restaurantname, 'city': area }
    ).subscribe(res => {
      this.data = res.json();
      this.DisplayRests = [];
      this.data.forEach(element => {
        this.DisplayRests.push(element);
      });
    });
  }

  /**
   * Displays a list of restaurants based on the restaurant tag and area that the user enters.
   * @param {String} TagName
   * @param {String} area
   */
  SearchByTags(TagName, area) {
    this._http.post('http://localhost:3000/restaurants/searchByTag', { 'tag': TagName, 'city': area }
    ).subscribe(res => {
      this.data = res.json();
      this.DisplayRests = [];
      this.data.forEach(element => {
        this.DisplayRests.push(element);
      });
    });
  }

  /**
   * Uses Google API to get the city name for the given coordinates and sets it on the home page.
   * @param {object} position
   * @param {String} area
   */
  ngOnInit() {
    function geo_error() {
    }

    const geo_options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    };

    const wpid = navigator.geolocation.watchPosition((position) => {
      const url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false';
      this._http.get(url).subscribe(res => {
        this.data = res.json();
        this.cityname = this.data.results[0].address_components[2].long_name.toLowerCase();
      });
    }, geo_error, geo_options);

    this._http.get('http://localhost:3000/restaurants/list').subscribe(res => {
      this.data = res.json();
      this.data.forEach(element => {
        this.options.push(element._source.name);
        this.locations.push(element._source.city);
      });
    });

    this.filteredRestaurants = this.restaurant.valueChanges.startWith(null)
      .map(val => val ? this.filter(val) : this.options.slice());

    this.filteredLocations = this.location.valueChanges.startWith(null)
      .map(val => val ? this.filterloc(val) : this.locations.slice());
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  filterloc(val: string): string[] {
    return this.locations.filter(location =>
      location.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
