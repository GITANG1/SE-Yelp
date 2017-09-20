import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';


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

     location: FormControl = new FormControl();

     locations=[
      'Gainesville',
      'Mumnai',
      'columbus'
     ];


  constructor() { }

  ngOnInit() {
  }

}

