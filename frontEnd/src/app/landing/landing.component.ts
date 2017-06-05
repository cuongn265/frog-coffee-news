import { AuthService } from './../auth.service';
import { CategoryService } from './../category.service';
import { User } from './../user/user';
import { Category } from './../category';
import { Component, OnInit, HostListener } from '@angular/core';
import { ArticleService } from "../article/article.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [ArticleService]
})
export class LandingComponent implements OnInit {

  categoryList: Category[];
  user: User;
  backgroundUrl = [
    'https://i.ytimg.com/vi/GyUrxhPs7iw/maxresdefault.jpg',
    'http://orig05.deviantart.net/54fe/f/2015/065/0/6/tressor_by_jandyaditya-d8kov0q.png',
    'http://wasiladev.com/wp-content/uploads/2017/03/seo.png',
    'https://www.sketchappsources.com/resources/source-image/Xbox-One-Pad-dembsky.png',
    'https://i.ytimg.com/vi/t5CotvyUmb8/maxresdefault.jpg',
    'https://i.ytimg.com/vi/ROlYuWRGP0w/maxresdefault.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/537d9047268173.587553663b674.png',
    'http://www.gettingsmart.com/wp-content/uploads/2015/07/theory-vector-482x335.jpg'

  ];
  config: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 5000
  };
  //http://www.gettingsmart.com/wp-content/uploads/2015/07/theory-vector-482x335.jpg
  //https://www.colourbox.com/preview/11546518-creative-science-flat-concept.jpg
  categoryPage: any;
  comingSoonCategoryLength: any;
  comingSoonCategory: any;
  newsType: string = 'latest';
  activeTab: string = 'latest';
  inactiveTab: string = 'popular';
  totalComments: number;

  constructor(private categoryService: CategoryService, private auth: AuthService, private articleServce: ArticleService) { }

  ngOnInit() {
    this.comingSoonCategoryLength = 0;
    this.comingSoonCategory = [];
    this.categoryPage = [];
    this.categoryService.getCategories().then(
      (response) => {
        this.categoryList = response;
        let j = 1;
        this.categoryPage[j - 1] = [];
        this.categoryList.forEach((category, index) => {
          if (index >= 4 * j) {
            j++;
            this.categoryPage[j - 1] = [];
          };
          this.categoryPage[j - 1].push(category);
        });
        if (this.categoryPage[j - 1].length < 4) {
          this.comingSoonCategoryLength = 4 - this.categoryPage[j - 1].length;
          this.comingSoonCategory = new Array(this.comingSoonCategoryLength);
        }
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

  updateTab() {
    this.activeTab = this.activeTab == 'latest' ? 'popular' : 'latest';
    this.inactiveTab = this.inactiveTab == 'latest' ? 'popular' : 'latest';
  }

  getTotalComments(articleId: string) {
    this.articleServce.getComments(articleId).then(res => this.totalComments = res.length);
  }

  lastScrollTop = 0;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    // let p = $('.latest-news-area').offset().top - $(window).height() * 0.1;
    // let pos = document.body.scrollTop;
    // if (pos == 0) {
    //   $('html, body').animate({
    //     scrollTop: p
    //   }, 1000);
    // }
    // var st = $('body').scrollTop();
    
    // if (st > this.lastScrollTop) {
    //   console.log('down')
    //   console.log(pos); 
    //   console.log(p);
    //   if (pos < p) {
    //     console.log('animate is trigger')
    //     $('html, body').animate({
    //       scrollTop: p
    //     }, 1000);
    //   } else {
    //     console.log('pos is greater than p')
    //   }
    // } else {
    //   console.log('up')
    // }
    // this.lastScrollTop = st;
  }
}
