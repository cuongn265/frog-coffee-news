import { Injectable } from '@angular/core';
import { Article } from './article';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  private apiUrl: string = 'http://localhost:3000/api/';

  constructor(private http: Http) { }

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
