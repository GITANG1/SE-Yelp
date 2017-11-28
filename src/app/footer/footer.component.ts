import { Component, OnInit } from '@angular/core';

/**
 * Footer module to display site name and/or information as the footer on all pages across the site
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
