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
  articleIndex = 0;
  isLoading = false;
  isFinish = false;
  private sub: any;
  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName']; // (+) converts string 'id' to a number

      this.publishedArticles = [];
      this.infiniteArticles = [];
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          console.log(response.length);
          console.log(response);
          this.articlesList = response;
          this.articlesList.forEach(article => {
            if (article.date) {
              this.publishedArticles.push(article);
            }
          }, this);
          this.addItems(0, this.sum);
        }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addItems(startIndex, endIndex) {
    let i = this.articleIndex;
    for (; i < this.sum; ++i) {
      this.articleIndex++;
      this.infiniteArticles.push(this.publishedArticles[i]);
      if (this.sum == this.publishedArticles.length) {
        this.isFinish = true;
      }
    }
  }
  onScrollDown() {
    const start = this.sum;
    this.sum += 6;
    if (this.sum >= this.publishedArticles.length) {
      this.sum = this.publishedArticles.length
    }
    this.isLoading = true;
    let self = this;
    setTimeout(function () {
      self.addItems(start, this.sum);
      self.isLoading = false;
    }, 1000);
  }
}
