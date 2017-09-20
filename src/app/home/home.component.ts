import {Component,OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  restaurant: FormControl = new FormControl();
  
    options = [
      'burgers',
      'tacos',
      'Pizza' 
     ];

     filteredRestaurants: Observable<string[]>;
     
     location: FormControl = new FormControl();

     locations=[
      'Gainesville',
      'Mumbai',
      'columbus'
     ];

     filteredLocations: Observable<string[]>;


  constructor() { }

  ngOnInit() {
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


