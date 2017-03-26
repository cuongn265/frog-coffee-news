import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Article } from "../../article/article";
import { Category } from "../../category";
import { ArticleService } from "../../article/article.service";
import { CategoryService } from "../../category.service";
import { MdDialogRef } from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  providers: [ArticleService, CategoryService]
})
export class ArticleEditorComponent implements OnInit {

  articleDetail: Article = new Article();
  data: Object;
  categories: Category[];
  selectedCategory: Category;
  sub: any;
  isCreate: boolean = true;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    private _location: Location,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.articleService.getArticleDetail(params['id']).then(res => this.articleDetail = res);
        this.isCreate = false;
      }
      this.categoryService.getCategories().then((res) => {
        this.categories = res;
      });
    });
  }

  onSubmit(article: any): void {
    console.log('you submitted value:', article);
    if (article._id === undefined) {
      this.articleService.postArticle(article).then((res) => {
        this.openSnackBar('Article is created successfully', null);
      }).catch(res => {
        this.openSnackBar('An error occurred', null);
      });
    } else {
      this.articleService.putArticle(article).then((res) => {
        this.openSnackBar('Article is updated successfully', null);
      }).catch(res => {
        this.openSnackBar('An error occurred', null);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onCancel() {
    this._location.back();
  }
}
