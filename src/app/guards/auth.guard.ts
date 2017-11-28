import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard is used to check whether a user is currently logged in or not by checking for existing session token.
 * This is then used to toggle pages and authorization on pages across the website.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) {

    }
    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
