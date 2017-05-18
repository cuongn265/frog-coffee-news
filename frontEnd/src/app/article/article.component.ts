import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})


export class ArticleComponent implements OnInit, OnDestroy {

  articlesList: Article[];
  categoryName: string;
  publishedArticles: Article[] = [];
  array = [];
  infiniteArticles: Article[] = [];
  sum = 6;
  throttle = 400;
  scrollDistance = 0;
  articleIndex = 4;
  isLoading = false;
  isFinish = false;
  private sub: any;
  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.articleIndex = 4;
      this.infiniteArticles = [];
      this.categoryName = params['categoryName']; // (+) converts string 'id' to a number

      this.publishedArticles = [];
      this.infiniteArticles = [];
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.articlesList = response;
          this.articlesList.forEach(article => {
            if (article.date) {
              this.publishedArticles.push(article);
            }
          }, this);
          this.addItems(4, this.sum);
        }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addItems(startIndex, endIndex) {
    if (this.sum >= this.publishedArticles.length) {
      this.sum = this.publishedArticles.length
    }

    for (let i = this.articleIndex; i < this.sum; ++i) {
      let length = this.publishedArticles.length
      this.articleIndex++;
      this.infiniteArticles.push(this.publishedArticles[length - 1 - i]);
      if (this.sum == this.publishedArticles.length) {
        this.isFinish = true;
      }
    }
  }
  onScrollDown() {
    this.sum += 6;
    this.isLoading = true;
    let self = this;
    setTimeout(function () {
      self.addItems(this.articleIndex, this.sum);
      self.isLoading = false;
    }, 1000);
  }
}
