import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';
import { User } from './user/user';
import { AuthService } from './auth.service';
import { SocketIOService } from './socket.io/socket-io.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CategoryService, AuthService]
})
export class AppComponent implements OnInit {
  categoryList: Category[];
  user: User;

  constructor(private categoryService: CategoryService, private auth: AuthService, private socketService: SocketIOService) { }

  
  ngOnInit() {
    this.categoryService.getCategories().then(
      (response) => {
        this.categoryList = response;
      }
    );
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
