import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import {Slide} from './slide2';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SlideService{
  private headers = new Headers({'Content-Type': 'application/json'});
    private API:string = 'http://localhost:8000/api/v1/new_protducts';
    constructor(private http:Http){}
    getSlideProduct(): Promise<Slide[]>{
      return this.http.get(this.API)
      .toPromise()
      .then(response => response.json().result as Slide[])
      .catch(this.handleError);
    }

    getAllSlideProduct(): Promise<Slide[]>{
      return this.http.get(this.API)
      .toPromise()
      .then(response => response.json().result as Slide[])
      .catch(this.handleError);
    }
    private handleError(error:any):Promise<any>{
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }
}