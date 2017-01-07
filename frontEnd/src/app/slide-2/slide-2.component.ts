import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Slide } from './slide2';
import { SlideService } from './slide2.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-slide-2',
  templateUrl: './slide-2.component.html',
  styleUrls: ['./slide-2.component.scss'],
  providers: [SlideService, ArticleService]
})
export class Slide2Component implements OnInit, AfterViewInit {
  slideList: Slide[];
  slideAllList: Slide[];
  sub: any;
  articlesList: Article[];
  publishedArticles: Article[];
  categoryName: string;
  constructor(private slideService: SlideService, private articleService: ArticleService,
    private el: ElementRef, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    $(this.el.nativeElement).ready(function () {
      $('#myCarousel').carousel({
        interval: 30000
      });

      let clickEvent = false;
      $('#myCarousel').on('click', '.nav a', function () {
        clickEvent = true;
        $('.nav li').removeClass('active');
        $(this).parent().addClass('active');
      }).on('slid.bs.carousel', function (e) {
        if (!clickEvent) {
          let count = $('.nav').children().length - 1;
          let current = $('.nav li.active');
          current.removeClass('active').next().addClass('active');
          let id = parseInt(current.data('slide-to'));
          if (count === id) {
            $('.nav li').first().addClass('active');
          }
        }
        clickEvent = false;
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
        }
      );
    });
  }
}
