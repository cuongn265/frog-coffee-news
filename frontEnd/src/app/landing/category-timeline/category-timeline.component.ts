import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { ArticleService } from '../../article/article.service';
import { Article } from '../../article/article';
import { Category } from '../../category';
@Component({
  selector: 'app-category-timeline',
  templateUrl: './category-timeline.component.html',
  styleUrls: ['./category-timeline.component.scss'],
  providers: [ArticleService]
})
export class CategoryTimelineComponent implements OnInit, OnChanges {
  @Input() category: Category;
  @Input() type: string;
  articles: Article[];
  orderField = 'date';
  isReverse = true;

  constructor(private articleService: ArticleService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.articleService.getArticles(this.category.name).then(res => this.articles = res);
  }

  ngOnChanges() {
    console.log(this.type);
    this.ref.detectChanges();
    if (this.type == 'latest') {
      this.orderField = 'date';
      this.isReverse = true;
    } else {
      this.orderField = 'score';
      this.isReverse = true;
    }
  }
}
