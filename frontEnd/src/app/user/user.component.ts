import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { UserService } from "./user.service";
import { SocketIOService } from "../socket.io/socket-io.service";
import { Category } from '../category';
import { User } from './user';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [CategoryService, AuthService, UserService]
})
export class UserComponent implements OnInit {
  categoryList: Category[];
  user: User;

  private notifications: any[];
  private totalNotSeenNotifications: number = 0;

  constructor(private categoryService: CategoryService, private userService: UserService, private auth: AuthService, private socketService: SocketIOService) { }

  ngOnInit() {
    this.socketService.initializeSocketInstance();
    this.socketService.listenToNotification().subscribe((notifications) => {
      this.notifications = notifications;
      this.totalNotSeenNotifications = this.countNotSeenNotification(this.notifications);
    });
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

  countNotSeenNotification(notifications: any[]) {
    this.totalNotSeenNotifications = notifications.length;
    for (let notification of notifications) {
      if (notification.seen == true)
        this.totalNotSeenNotifications--;
    }
    return this.totalNotSeenNotifications;
  }

  markAllAsSeen() {
    if (this.auth.authenticated()) {
      if (this.checkProfile()) {
        let userId = this.user.identities[0].user_id;
        this.userService.markAllNotificationAsSeen(userId);
        this.totalNotSeenNotifications = 0;
      }
    }
  }
}
