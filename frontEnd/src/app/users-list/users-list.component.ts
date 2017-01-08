import { AuthService } from './../auth.service';
import { Http } from '@angular/http';
import { ArticleService } from './../article/article.service';
import { UserService } from './../user/user.service';
import { User } from './../user/user';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { PizzaDialogComponent } from './../pizza-dialog/pizza-dialog.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { MenuItem, DataTable } from 'primeng/primeng';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserService, AuthService]
})
export class UsersListComponent implements OnInit {

  users: User[];
  selectedUser: User[];
  articlesList: Article[];
  stacked: boolean;
  dialogRef: MdDialogRef<PizzaDialogComponent>;
  items: MenuItem[];
  icon: string;
  visible: boolean = true;

  constructor(private http: Http, private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    // TODO: Fix undefined response when get data via service
    this.http.get('https://heroku-node-angular2.herokuapp.com/api/all/users')
      .toPromise().then((response) => {
        this.users = response.json();
        console.log(this.users);
      }
      );

    this.items = [
      { label: 'Enable', icon: 'fa-search', command: (event) => console.log(this.selectedUser) },
    ];
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  selectUser(user: User) {
    console.log(user.email);
  }

  lock(userId: number) {
    this.userService.lockUser(userId).then((res) => {
      console.log(res);
    });
  }

  unlock(userId: number) {
    this.userService.unlockUser(userId).then((res) => {
      console.log(res);
    });
  }

  changeState(event: any, user: User) {
    if (event.checked) {
      console.log('checked');
      this.lock(user.idUser);
    } else {
      console.log('unchecked');
      this.unlock(user.idUser);
    }
    return true;
  }
}



