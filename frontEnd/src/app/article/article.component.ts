import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  articlesList: Article[];

  ngOnInit() {
    this.articleService.getArticles().then(
      (response) => {
        this.articlesList = response;
      }
    );
  }
}
