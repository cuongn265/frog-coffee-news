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
  private sub: any;
  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName']; // (+) converts string 'id' to a number 
      // console.log(this.categoryName);
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.articlesList = response;
          console.log(this.articlesList.length);
        }
      );
    });

    // this.articleService.getArticles(this.name).then(
    //   (response) => {
    //     this.articlesList = response;
    //   }
    // );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
