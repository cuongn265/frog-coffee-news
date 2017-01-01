import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [ArticleService]
})
export class ArticlesListComponent implements OnInit {

  articlesList: Article[];

  displayDialog: boolean;

  article: Article = new Article();

  selectedArticle: Article;

  newArticle: boolean;

  cars: Article[];

  stacked: boolean;

  constructor(private articlesService: ArticleService) { }

  ngOnInit() {
    this.articlesService.getArticles('all').then(
      (response) => {
        this.articlesList = response;
        console.log(this.articlesList.length);
      }
    );
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  showDialogToAdd() {
    this.newArticle = true;
    this.article = new Article();
    this.displayDialog = true;
  }

  save() {
    if (this.newArticle) {
      this.cars.push(this.article);
    } else {
      this.cars[this.findSelectedCarIndex()] = this.article;
    }

    this.article = null;
    this.displayDialog = false;
  }

  delete() {
    this.articlesList.splice(this.findSelectedCarIndex(), 1);
    this.article = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newArticle = false;
    this.article = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: Article): Article {
    let article = new Article();
    for (let prop in c) {
      article[prop] = c[prop];
    }
    return article;
  }

  findSelectedCarIndex(): number {
    return this.articlesList.indexOf(this.selectedArticle);
  }
}
