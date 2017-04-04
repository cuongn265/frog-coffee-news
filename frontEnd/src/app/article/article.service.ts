import { Injectable } from '@angular/core';
import { Article } from './article';
import { Comment } from '../comment';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService {

  private apiUrl: string = process.env.apiUrl;

  constructor(private http: Http) { }

  // get articles of selected category
  getArticles(name: string): Promise<Article[]> {
    let articleUrl: string;
    if (name === undefined || name == 'all' || name == '') {
      articleUrl = this.apiUrl + 'articles';
    } else {
      articleUrl = this.apiUrl + 'categories/' +name + '/articles';
    }

    return this.http.get(articleUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // get article detail by articleID
  getArticleDetail(id: string): Promise<Article> {

    if (id === undefined) {
      return null;
    } else {
      let requestURL = this.apiUrl + 'articles' + '/' + id;
      return this.http.get(requestURL).toPromise().then(response => response.json()).catch(this.handleError);
    }
  }


  postArticle(article: Article) {
    let body = JSON.stringify(article);
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'articles', body, { headers: header })
      .toPromise().then(response => response).catch(this.handleError);
  }


  putArticle(article: Article) {
    let body = JSON.stringify(article);
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + 'articles/' + article._id, body, { headers: header })
      .toPromise().then(response => response).catch(this.handleError);
  }

  deleteArticle(articleId: String) {
    let article = { '_id': articleId };
    let body = JSON.stringify(article);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.apiUrl + 'articles/' + articleId , new RequestOptions({
      headers: headers,
      body: body
    })).toPromise().then(response => response).catch(this.handleError);
  }

  getComments(id: string): Promise<any> {
    let url = this.apiUrl + 'articles' + '/' + id + '/comments';
    return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
  }

  postComment(comment: Comment) {
    let body = JSON.stringify(comment);
    let header = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'comment', body, { headers: header }).toPromise().then(response => {
      console.log(response.status);
    }).catch(this.handleError);
  }

  putComment(comment: Comment) {
    let body = JSON.stringify(comment);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + 'comment', body, { headers: headers }).toPromise().then(response => response);
  }

  removeComment(comment: Comment) {
    let selectedComment = { '_id': comment._id }
    let body = JSON.stringify(selectedComment);
    let headers = new Headers({ 'Content-Type': 'application/json ' });
    return this.http.delete(this.apiUrl + 'comment', new RequestOptions({
      headers: headers,
      body: body
    })).toPromise().then(response => response).catch(this.handleError);
  }

  // Time Converting Methods ---------------------------- //
  getTimeDistance(Post_TimeStamp: string): string {
    // get current time - UTC format
    let currentTimestamp = new Date().getTime();
    let date_string = Post_TimeStamp;
    let date_converted = new Date(date_string).getTime();

    let distance = currentTimestamp - date_converted;

    let distance_dates = +this.toDate(distance);
    let distance_hours = +this.toHour(distance);
    let distance_minutes = +this.toMinutes(distance);

    let message: string = '';


    if (distance_dates < 1) {
      if (distance_hours < 1) {
        if (distance_minutes <= 1) {
          message = 'just now';
        }
        else {
          message = distance_minutes + ' minutes ago';
        }
      }
      else {
        message = distance_hours + ' hours ago';
      }
    }
    else {
      message = distance_dates + ' days ago';
    }

    return message;
  }

  private toHour(time) {
    return (time / (1000 * 60 * 60)).toFixed(0);
  }

  private toDate(time) {
    return (time / (1000 * 60 * 60 * 24)).toFixed(0);
  }

  private toMinutes(time) {
    return (time / (1000 * 60)).toFixed(0);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
