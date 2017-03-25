import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Article } from "../../article/article";
import { Category } from "../../category";
import { ArticleService } from "../../article/article.service";
import { CategoryService } from "../../category.service";
import { MdDialogRef } from "@angular/material";
import { PizzaDialogComponent } from "../../pizza-dialog/pizza-dialog.component";

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  providers: [ArticleService, CategoryService]
})
export class ArticleEditorComponent implements OnInit {

  articleDetail: Article = new Article();
  // dialogRef: MdDialogRef<PizzaDialogComponent>;
  data: Object;
  categories: Category[];
  selectedCategory: Category;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    private _location: Location) {
  }

  ngOnInit() {
    // this.data = this.dialogRef.componentInstance;
    // this.articleDetail = this.dialogRef.componentInstance.articleDetail;
    this.categoryService.getCategories().then((res) => {
      this.categories = res;
      this.selectedCategory = this.categories[0];
    });
  }

  onSubmit(article: any): void {
    console.log('you submitted value:', article);
    if (article._id === undefined) {
      this.articleService.postArticle(article).then(res => console.log(res));
    } else {
      this.articleService.putArticle(article).then(res => console.log(res));
    }
  }

  onCancel() {
    this._location.back();
  }
}
