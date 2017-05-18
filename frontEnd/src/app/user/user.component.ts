import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { SocketIOService } from "../socket.io/socket-io.service";
import { Category } from '../category';
import { User } from './user';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [CategoryService, AuthService]
})
export class UserComponent implements OnInit {
  categoryList: Category[];
  user: User;

  constructor(private categoryService: CategoryService, private auth: AuthService, private socketService: SocketIOService) { }

  ngOnInit() {
    this.socketService.initializeSocketInstance();
    this.socketService.listenToNotification();
    this.categoryService.getCategories().then(
      (response) => {
        this.categoryList = response;
      }
    );


    if (this.auth.authenticated()) {
      if (this.checkProfile()) {
        let userId = this.user.identities[0].user_id;
        /* Subscribe to notification event */

        this.socketService.subscribeUser(userId);
      }
    }
  }

  checkProfile() {
    let profile = localStorage.getItem('profile');
    if (profile) {
      this.user = JSON.parse(profile);
      return true;
    }
    return false;
  }
}
