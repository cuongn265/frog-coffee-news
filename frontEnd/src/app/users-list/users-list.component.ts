import { Http } from '@angular/http';
import { ArticleService } from './../article/article.service';
import { UserService } from './../user/user.service';
import { User } from './../user/user';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { PizzaDialogComponent } from './../pizza-dialog/pizza-dialog.component';
import { MdDialogRef, MdDialog } from '@angular/material';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserService, ArticleService]
})
export class UsersListComponent implements OnInit {

  users: User[];
  selectedUser: User[];
  articlesList: Article[];
  stacked: boolean;
  dialogRef: MdDialogRef<PizzaDialogComponent>;
  items: MenuItem[];
  icon: string;

  constructor(private http: Http, private userService: UserService) { }

  ngOnInit() {
    // TODO: Fix undefined response when get data via service
    this.http.get('http://localhost:3000/api/all/users')
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
}
