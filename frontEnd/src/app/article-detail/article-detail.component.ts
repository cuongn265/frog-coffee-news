import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  providers: [ArticleService, UserService]
})
export class ArticleDetailComponent implements OnInit {

  private sub: any;
  private categoryName: string;
  private articleId: number;
  private article: Article;
  private commentList: Object;


  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private userService: UserService) { }

  ngOnInit() {
    // get articleID from requestURL
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.articleId = +params['articleId'];
      this.articleService.getArticleDetail(this.categoryName, this.articleId).then(article => {
        this.article = article[0];
        console.log(this.article);
        this.commentList = this.article['comments'];
        console.log(this.commentList);
      });
    });
  }

  getCommentPeriod(timeStamp: string){
    return this.articleService.getTimeDistance(timeStamp);
  }
}
