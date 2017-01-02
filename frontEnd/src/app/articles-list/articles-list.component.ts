import { PizzaDialogComponent } from './../pizza-dialog/pizza-dialog.component';
import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [ArticleService]
})
export class ArticlesListComponent implements OnInit {

  articlesList: Article[];
  article: Article = new Article();
  stacked: boolean;
  dialogRef: MdDialogRef<PizzaDialogComponent>;
  ckeditorContent: string;

  constructor(private articlesService: ArticleService, public dialog: MdDialog) { }

  ngOnInit() {
    this.ckeditorContent = `<p>My HTML</p>`;
    this.articlesService.getArticles('all').then(
      (response) => {
        this.articlesList = response;
        console.log(this.articlesList.length);
      }
    );
  }

  openDialog() {
    this.dialogRef = this.dialog.open(PizzaDialogComponent, {
      disableClose: false,
      width: '700px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }

  toggle() {
    this.stacked = !this.stacked;
  }

  onRowSelect(event) {
    console.log(event);
    this.dialogRef = this.dialog.open(PizzaDialogComponent, {
      disableClose: false,
      width: '700px'
    });
    this.dialogRef.componentInstance.articleDetail = event.data;

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
      let self = this;
      setTimeout(function () {
        self.articlesService.getArticles('all').then(
          (response) => {
            self.articlesList = response;
            console.log(self.articlesList.length);
          }
        );
      }, 1);

    });
  }
}
