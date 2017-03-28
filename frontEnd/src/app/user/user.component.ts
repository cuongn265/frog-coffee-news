import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { User } from './user';
import { SocketIOService } from '../socket.io/socket-io.service';

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

  linkClick(categoryName: String){
    console.log('Click triggered !');
    console.log('Hit '+categoryName);
  }
}
