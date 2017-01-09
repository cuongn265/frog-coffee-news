import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';
import { User } from './user/user';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CategoryService, AuthService]
})
export class AppComponent implements OnInit {
  categoryList: Category[];
  user: User;

  constructor(private categoryService: CategoryService, private auth: AuthService) { }

  ngOnInit() {
    this.categoryService.getCategories().then(
      (response) => {
        this.categoryList = response;
      }
    );
    console.log("DEV ENV OR DEV PROD:");
    console.log(process.env.localApi);
    console.log(process.env.anotherVariable);
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
