import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { AuthService } from './auth.service';
import { User } from './user/user';

@Injectable()
export class AuthGuard implements CanActivate {

  user: User;

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    // If user is not logged in we'll send them to the homepage 
    if (!this.auth.authenticated()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      let profile = localStorage.getItem('profile');
      this.user = JSON.parse(profile);
      console.log(this.user.role);
      if (this.user.role !== 1) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    }
  }
}
