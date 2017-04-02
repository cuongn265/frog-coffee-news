import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialog, MdSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
import { MenuItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'

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
  ckeditorContent: string;
  menuItems: MenuItem[];
  selectedArticle: Article;
  selectedOption: string;

  constructor(private articlesService: ArticleService,
              private router: Router,
              private auth: AuthService,
              private route: ActivatedRoute,
              private dialog: MdDialog,
              private snackBar: MdSnackBar) {}

  ngOnInit() {
    this.menuItems = [
            {label: 'Update', icon: 'fa-pencil', command: (event) => this.onUpdate(this.selectedArticle)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.onOpenConfirmDialog(this.selectedArticle)}
        ];
    this.ckeditorContent = `<p>My HTML</p>`;
    this.articlesService.getArticles('').then(
      (response) => {
        this.articlesList = response;
        console.log(this.articlesList);
      }
    );
  }

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

  onOpenConfirmDialog(article: Article) {
    console.log(article)
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        console.log(article);
        this.onDelete(article);
      }
    })
  }

  onDelete(article: Article) {
    console.log('on delete');
    console.log(article);
    this.articlesService.deleteArticle(article._id)
      .then((res) => {
        console.log(res);
        let self = this;
        this.refresh(self);
        this.openSnackBar('Article is deleted successfully', null);
      })
      .catch(res => {
        this.openSnackBar('An error occurred', null);
      });
  }

  onUpdate(article: Article) {
    this.router.navigate([article._id, 'edit'], {relativeTo: this.route})
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
