import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})


export class ArticleComponent implements OnInit, OnDestroy {

  @Input() name: string;

  articlesList: Article[];
  categoryName: string;
  private sub: any;

  constructor(private articleService: ArticleService) { }


  ngOnInit() {

    this.articleService.getArticles(this.name).then(
      (response) => {
        this.articlesList = response;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
