import { User } from './user/user';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  options = {
    theme: {
      logo: 'https://cdn.auth0.com/blog/angular2-series/angular2-logo.png',
      primaryColor: '#673ab7'
    },
    languageDictionary: {
      title: 'Mercury',
      error: {
        login: {
          'lock.invalid_email_password': 'Your username or password is invalid',
          'lock.unauthorized': 'Your account has been blocked'
        },
        signUp: {
          'invalid_password': 'Password is invalid.',
          'password_no_user_info_error': 'Password is based on user information.',
          'password_strength_error': 'Password is too weak.',
          'user_exists': 'The user already exists.',
          'username_exists': 'The username already exists.'
        }
      },
    },
    auth: { redirect: false },
    socialButtonStyle: 'small',
    additionalSignUpFields: [{
      name: 'first_name',
      placeholder: 'Enter your first name'
    },
    {
      name: 'last_name',
      placeholder: 'Enter your last name'
    },
    {
      name: 'phone',
      placeholder: 'Enter your phone number'
    }]
  };
  lock = new Auth0Lock('8VZeo0lbIPEz3OCGSVuC4AdWvKZBD0k9', 'cuongnm265.au.auth0.com', this.options);
  userProfile: User;

  constructor(private router: Router) {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          alert(error);
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });

    this.lock.on('authorization_error', function (error) {
      this.lock.show({
        flashMessage: {
          type: 'error',
          text: error.error_description
        }
      });
    }, this);
  }

  public login() {
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  }
}
