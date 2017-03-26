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
