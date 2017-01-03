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
        return this.http.get(this.apiUrl + 'all/users').toPromise().then(response => response.json()).catch(this.handleError);
    }

    getUserAccount(userId: number): Promise<User> {
        return this.http.get(this.apiUrl + 'all/users/' + userId).toPromise().then(response => response.json()).catch(this.handleError);
    }

    lockUser(userId: number) {
        let putUrl = this.apiUrl + 'users/' + userId + '/lock';
        return this.http.put(putUrl, {}).toPromise().then(response => response).catch(this.handleError);
    }

    unlockUser(userId: number) {
        let putUrl = this.apiUrl + 'users/' + userId + '/unlock';
        return this.http.put(putUrl, {}).toPromise().then(response => response).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
