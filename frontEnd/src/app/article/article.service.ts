import { Injectable } from '@angular/core';
import { Article } from './article';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  private articleUrl: string = 'http://localhost:3000/api/articles';

  constructor(private http: Http) { }

  getArticles(categoryName: string): Promise<Article[]> {
    return this.http.get(this.articleUrl + '/' + categoryName)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
