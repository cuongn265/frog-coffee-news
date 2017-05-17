import { AuthService } from './../auth.service';
import { CategoryService } from './../category.service';
import { User } from './../user/user';
import { Category } from './../category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  categoryList: Category[];
  user: User;
  backgroundUrl = [
    'https://upload.wikimedia.org/wikipedia/commons/3/35/Fall_Wallpaper.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/72/9d/77/729d772bf4ac64194477248b20190e6e.jpg',    
    'https://upload.wikimedia.org/wikipedia/commons/e/eb/33_ALMA_Antennas_on_Chajnantor_%28wallpaper%29.jpg',
    'http://cdn.wallpapersafari.com/70/1/LpBmi4.jpg',
    'http://media.blizzard.com/sc2/media/wallpapers/wall080/wall080-1920x1080.jpg',
    'https://s-media-cache-ak0.pinimg.com/originals/72/9d/77/729d772bf4ac64194477248b20190e6e.jpg',    
  ]

  constructor(private categoryService: CategoryService, private auth: AuthService) { }

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

  onClick() {
    console.log('click');
  }

}
