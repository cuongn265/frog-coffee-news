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

  // @Input() name: string;

  articlesList: Article[];
  categoryName: string;
  publishedArticles: Article[];
  array = [];
  infiniteArticles: Article[] = [];
  sum = 6;
  throttle = 400;
  scrollDistance = 2;
  articleIndex = 0;
  private sub: any;
  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }


  ngOnInit() {
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
      console.log("----------: " + i);
      console.log(this.publishedArticles[i]);
      console.log('----------');
      this.articleIndex++;
      this.infiniteArticles.push(this.publishedArticles[i]);
    }
    console.log(this.infiniteArticles)
  }
  onScrollDown() {
    console.log('scrolled!!');

    // add another 20 items
    const start = this.sum;
    console.log('start: ' + start);
    this.sum += 6;
    console.log('sum: ' + this.sum);
    if (this.sum >= this.publishedArticles.length) {
      this.sum = this.publishedArticles.length
    }
    this.addItems(start, this.sum);
  }

  onScroll() {
    console.log('scrolled!!')
  }
}
