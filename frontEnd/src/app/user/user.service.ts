import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { User } from './user';
import { Comment } from '../comment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private apiUrl: string = 'http://localhost:3000/api/';
    constructor(private http: Http) { }

    getUserAccounts(): Promise<User[]> {
        return this.http.get(this.apiUrl + '/users').toPromise().then(response => response.json()).catch(this.handleError);
    }

    getUserAccount(userId: number): Promise<User> {
        return this.http.get(this.apiUrl + '/users/' + userId).toPromise().then(response => response.json()).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
