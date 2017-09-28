import {Component,OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  restaurant: FormControl = new FormControl();
    options = [];

     filteredRestaurants: Observable<string[]>;
     location: FormControl = new FormControl();
     locations= [];
     filteredLocations: Observable<string[]>;

     data: any;

     SearchRestaurants(restaurantname, area) {
      console.log(restaurantname);
      console.log(area);

      this._http.post('http://192.168.0.11:3000/restaurants/search', { 'search': restaurantname }
      ).subscribe(res => {
        this.data = res.json();
        console.log(this.data);
  });
    }

       constructor(private _http: Http) {
       }

  ngOnInit() {

    this._http.get('http://192.168.0.11:3000/restaurants/list').subscribe(res => {
      this.data = res.json();
      this.data.forEach(element => {
      this.options.push(element.name);
      this.locations.push(element.city);
  });
      console.log(this.data);
});

    this. filteredRestaurants = this.restaurant.valueChanges.startWith(null)
    .map(val => val ? this.filter(val) : this.options.slice());
    this. filteredLocations = this.location.valueChanges.startWith(null)
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

