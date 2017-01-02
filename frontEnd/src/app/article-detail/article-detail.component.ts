import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { UserService } from '../user/user.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  providers: [ArticleService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ArticleDetailComponent implements OnInit {

  private sub: any;
  private categoryName: string;
  private articleId: number;
  private article: Article;
  private commentList: Object;
  private relatedArticleList: Article[];
  private shareUrl;
  constructor(private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.articleId = +params['articleId'];
      this.articleService.getArticleDetail(this.categoryName, this.articleId).then(article => {
        this.article = article[0];
        console.log(this.article);
        this.commentList = this.article['comments'];
        console.log(this.commentList);
      });

      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.relatedArticleList = response;
          console.log(this.relatedArticleList.length);
        }
      );
    });
    
    this.shareUrl = window.location.href.toString();
  }

  getCommentPeriod(timeStamp: string){
    return this.articleService.getTimeDistance(timeStamp);
  }
}
