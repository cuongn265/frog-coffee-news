import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { AuthService } from './auth.service';
import { User } from './user/user';

@Injectable()
export class AuthGuard implements CanActivate {

  private user: User;

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    // If user is not logged in we'll send them to the homepage 
    if (!this.auth.authenticated()) {
      this.router.navigate(['/news/all']);
      return false;
    } else {
      console.log(this.auth.userProfile.role);
      if (this.auth.userProfile.role !== 1) {
        this.router.navigate(['/news/all']);
        return false;
      } else {
        return true;
      }
    }
  }
}
