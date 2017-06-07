import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { User } from './user';
import { Comment } from '../comment';
import { Observable } from "rxjs/Observable";
import { SocketIOService } from "../socket.io/socket-io.service";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private apiUrl: string = process.env.apiUrl;

    public usersList: {
        first_name: string,
        last_name: string,
        email: string,
        phone: string
    }[] = [];
    constructor(private http: Http, private socketService: SocketIOService) { }

    getUserAccounts(): Promise<User[]> {
        return this.http.get(this.apiUrl + 'users').toPromise().then(response => response.json()).catch(this.handleError);
    }

    getUserAccount(userId: number): Promise<User> {
        return this.http.get(this.apiUrl + 'users/' + userId).toPromise().then(response => response.json()).catch(this.handleError);
    }

    getUserProfileImage(userId: string): Promise<string> {
        return this.http.get(this.apiUrl + 'users/' + userId + '/image').toPromise().then((imageURL) => imageURL.text()).catch(this.handleError);
    }

    toggleStatus(userId: string) {
        let putUrl = this.apiUrl + 'users/' + userId + '/toggleStatus';
        return this.http.put(putUrl, {}).toPromise().then(response => response).catch(this.handleError);
    }

    unlockUser(userId: string) {
        let putUrl = this.apiUrl + 'users/' + userId + '/unlock';
        return this.http.put(putUrl, {}).toPromise().then(response => response).catch(this.handleError);
    }

    markAllNotificationAsSeen(userId: string) {
        let postUrl = this.apiUrl + 'notifications/users/' + userId + '/seenAll';
        this.http.post(postUrl, {}).toPromise().then(response => response).catch(this.handleError);
    }

    markNotificationAsRead(userId: string, notificationId: string) {
        let putUrl = this.apiUrl + 'notifications/' + notificationId + '/markAsRead';
        this.http.put(putUrl, {}).toPromise().then(response => {
            this.socketService.markNotificationAsRead(userId);
        }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
