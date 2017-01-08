import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-slide-2',
  templateUrl: './slide-2.component.html',
  styleUrls: ['./slide-2.component.scss'],
  providers: [ArticleService]
})
export class Slide2Component implements OnInit, AfterViewInit {
  sub: any;
  articlesList: Article[];
  publishedArticles: Article[];
  categoryName: string;
  constructor(private articleService: ArticleService,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).ready(function () {
      $('#myCarousel').carousel({
        interval: 3000
      });
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName']; // (+) converts string 'id' to a number 
      console.log('cat:' + this.categoryName);
      this.publishedArticles = [];
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.articlesList = response;
          this.articlesList.forEach(article => {
            if (article.published) {
              this.publishedArticles.push(article);
            }
          }, this);
          $(this.el.nativeElement).ready(function () {
            $('#myCarousel').carousel({
              interval: 3000
            });
          });
        }
      );
    });
  }
}
