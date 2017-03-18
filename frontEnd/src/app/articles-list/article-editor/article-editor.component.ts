import { Component, OnInit } from '@angular/core';
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
    private categoryService: CategoryService) {
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
    if (article.idArticle === undefined) {
      this.articleService.postArticle(article).then(res => console.log(res));
    } else {
      this.articleService.putArticle(article).then(res => console.log(res));
    }
    // this.dialogRef.close('yes');
  }

  onRemove(id: number) {
    console.log('on remove');
    this.articleService.deleteArticle(id).then(res => console.log(res));
  }


}
