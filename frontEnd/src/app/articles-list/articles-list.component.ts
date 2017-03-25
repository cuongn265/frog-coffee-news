import { PizzaDialogComponent } from './../pizza-dialog/pizza-dialog.component';
import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { AuthService } from '../auth.service';
import { MenuItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [ArticleService, AuthService]
})
export class ArticlesListComponent implements OnInit {

  articlesList: Article[];
  article: Article = new Article();
  stacked: boolean;
  dialogRef: MdDialogRef<PizzaDialogComponent>;
  ckeditorContent: string;
  menuItems: MenuItem[];
  selectedArticle: Article;

  constructor(private articlesService: ArticleService, private router: Router, private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuItems = [
            {label: 'Update', icon: 'fa-pencil', command: (event) => this.onUpdate(this.selectedArticle)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.onDelete(this.selectedArticle)}
        ];
    this.ckeditorContent = `<p>My HTML</p>`;
    this.articlesService.getArticles('').then(
      (response) => {
        this.articlesList = response;
        console.log(this.articlesList);
      }
    );
  }

  // openDialog() {
  //   this.dialogRef = this.dialog.open(PizzaDialogComponent, {
  //     disableClose: false,
  //     width: '700px'
  //   });
  //
  //   this.dialogRef.afterClosed().subscribe(result => {
  //     console.log('result: ' + result);
  //     this.dialogRef = null;
  //     let self = this;
  //     this.refresh(self);
  //   });
  // }

  toggle() {
    this.stacked = !this.stacked;
  }

  refresh(self: any) {
    setTimeout(function () {
        self.articlesService.getArticles('').then(
          (response) => {
            self.articlesList = response;
            console.log(self.articlesList);
          }
        );
      }, 1);
  }

  // onRowSelect(event) {
  //   console.log(event);
  //   this.dialogRef = this.dialog.open(PizzaDialogComponent, {
  //     disableClose: false,
  //     width: '700px'
  //   });
  //   this.dialogRef.componentInstance.articleDetail = event.data;
  //
  //   this.dialogRef.afterClosed().subscribe(result => {
  //     console.log('result: ' + result);
  //     this.dialogRef = null;
  //     let self = this;
  //     this.refresh(self);
  //   });
  // }

  onDelete(article: Article) {
    this.articlesService.deleteArticle(article._id).then((res) => {
        console.log(res);
        let self = this;
        this.refresh(self);
      }
    )
  }

  onUpdate(article: Article) {
    console.log('navigate to update page')
    this.router.navigate([article._id, 'edit'], {relativeTo: this.route})
  }
}
