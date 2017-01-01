import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { User } from './../user/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList: User[];

  stacked: boolean;

  constructor() { }

  ngOnInit() {

  }
}
