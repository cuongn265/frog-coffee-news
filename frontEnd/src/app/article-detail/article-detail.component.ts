import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  providers: [ArticleService]
})
export class ArticleDetailComponent implements OnInit {

  private sub: any;
  private categoryName: string;
  private articleId: number;
  private article: Article;
  private relatedArticleList: Article[];
  constructor(private route: ActivatedRoute,
              private articleService: ArticleService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.articleId = +params['articleId'];
      this.articleService.getArticleDetail(this.categoryName, this.articleId).then(article => {
        this.article = article[0];
        console.log(this.article);
      });

       this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.relatedArticleList = response;
          console.log(this.relatedArticleList.length);
        }
      );
    });
  }
}
