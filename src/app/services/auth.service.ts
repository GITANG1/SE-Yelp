/**
 * File name : auth.service.ts
 * @author Srishti Hunjan
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

/**
 * Provides authentication service for users
 */
@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  /**
   * Registers a valid user
   * @param {JSON} user
   */
  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers }).map(res => res.json());
  }

  /**
   * Authenticates the user to check if its present in the database
   * @param {JSON} user
   */
  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }).map(res => res.json());
  }

  /**
   * REST API to retrieve the user profile
   */
  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers }).map(res => res.json());
  }

  /**
   * Retrieves the session token from the browser's local storage
   */
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

   /**
   * Stores session token and user info in the browser's local storage
   */
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  /**
   * Deletes browser local storage when the user logs out
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  /**
   * Returns a boolean value whether the user is a logged in one or not
   */
  loggedIn() {
    return tokenNotExpired('id_token');
  }
}
