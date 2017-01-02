import { CategoryService } from './../category.service';
import { ArticleService } from './../article/article.service';
import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Category } from '../category';

@Component({
  selector: 'app-pizza-dialog',
  templateUrl: './pizza-dialog.component.html',
  styleUrls: ['./pizza-dialog.component.scss'],
  providers: [ArticleService, CategoryService]
})
export class PizzaDialogComponent implements OnInit {

  articleDetail: Article = new Article();
  data: Object;
  categories: Category[];
  selectedCategory: Category;

  constructor(public dialogRef: MdDialogRef<PizzaDialogComponent>,
    private articleService: ArticleService,
    private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.data = this.dialogRef.componentInstance;
    this.articleDetail = this.dialogRef.componentInstance.articleDetail;
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
    this.dialogRef.close('yes');
  }

  onRemove(id: number) {
    console.log('on remove');
    this.articleService.deleteArticle(id).then(res => console.log(res));
  }

}
