/**
 * File name : header.component.ts
 * @author Gitang Karnam
 */
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

/**
 * HeaderComponent uses AuthService to display the current navigation tabs depending on whether a user is logged in or not.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }
}
