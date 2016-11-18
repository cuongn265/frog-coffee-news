import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit, OnDestroy {

  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }

  articlesList: Article[];
  categoryName: string;
  private sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName']; // (+) converts string 'id' to a number
      console.log(this.categoryName);
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.articlesList = response;
        }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
