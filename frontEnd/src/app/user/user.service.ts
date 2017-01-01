import { Article } from './../article/article';
import { User } from './user';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private apiUrl: string = 'http://localhost:3000/api/';

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get(this.apiUrl + 'all/users')
      .toPromise()
      .then((response) => {
        console.log('in service');
        response.json();
        console.log(response.json());
      })
      .catch(this.handleError);
  }

  getArticles(categoryName: string): Promise<Article[]> {
    let articleUrl: string;
    if (categoryName === undefined) {
      articleUrl = this.apiUrl + 'all/articles';
    } else {
      articleUrl = this.apiUrl + categoryName + '/articles';
    }

    return this.http.get(articleUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
