import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


@NgModule({
  imports: [
    FormsModule      //<----------make sure you have added this.
  ],
})


export class HomeComponent implements OnInit {

  title = 'this is homeComponent';

  cityname="";

  restaurant: FormControl = new FormControl();

  options = [];

  filteredRestaurants: Observable<string[]>;

  location: FormControl = new FormControl();

  locations = [];

  filteredLocations: Observable<string[]>;

  data: any;

  DisplayRests = [];


  SearchRestaurants(restaurantname, area) {
    console.log(restaurantname);
    console.log(area);
    console.log(this.DisplayRests);

    this._http.post('http://localhost:3000/restaurants/search', { "search": restaurantname, "city":area}
    ).subscribe(res => {
      this.data = res.json();
      this.DisplayRests = [];
      this.data.forEach(element => {
        this.DisplayRests.push(element);
      });
    });
  }

SearchByTags(TagName,area)
{

  console.log(TagName);
  console.log(area);


  this._http.post('http://localhost:3000/restaurants/searchByTag', { "tag": TagName, "city":area}
).subscribe(res => {
  this.data = res.json();
  this.DisplayRests = [];
  this.data.forEach(element => {
    this.DisplayRests.push(element);
  });
});
}
  constructor(private _http: Http) {

  }

  ngOnInit() {  
    function geo_error() {
      alert("Sorry, no position available.");
    }
    
    var geo_options = {
      enableHighAccuracy: true, 
      maximumAge        : 30000, 
      timeout           : 27000
    };
    
    var wpid = navigator.geolocation.watchPosition((position)=>{
     console.log(position.coords.latitude);
     console.log(position.coords.longitude);
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&sensor=false"
    console.log(url);
      
    this._http.get(url).subscribe(res => {
      
            this.data = res.json();
           
            console.log( this.data.results[0].address_components[2].long_name);

            this.cityname=this.data.results[0].address_components[2].long_namestr.toLowerCase();;
          });

    }, geo_error, geo_options);

    this._http.get('http://localhost:3000/restaurants/list').subscribe(res => {

      this.data = res.json();
      this.data.forEach(element => {
        this.options.push(element._source.name);

        this.locations.push(element._source.city);

      });
      console.log(this.data);
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


