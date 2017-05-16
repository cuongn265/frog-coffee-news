import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {

  config: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 300,
    // autoplay: 5000,
    centeredSlides: true,
    autoplayDisableOnInteraction: false
  };

  sub: any;
  articlesList: Article[];
  publishedArticles: Article[];
  categoryName: string;
  constructor(private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName']; // (+) converts string 'id' to a number 
      this.publishedArticles = [];
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.articlesList = response;
          this.articlesList.forEach(article => {
            if (article.date) {
              this.publishedArticles.push(article);
            }
          }, this);
        }
      );
    });
  }

  getArticlePeriod(timestamps) {
    return this.articleService.getTimeDistance(timestamps);
  }
}
