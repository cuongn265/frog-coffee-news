import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../article/article.service';
import { Article } from '../../article/article';
import { Category } from '../../category';
@Component({
  selector: 'app-category-timeline',
  templateUrl: './category-timeline.component.html',
  styleUrls: ['./category-timeline.component.scss'],
  providers: [ArticleService]
})
export class CategoryTimelineComponent implements OnInit {
  @Input() category: Category;
  articles: Article[];
  size = '120px';

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles(this.category.name).then(res => this.articles = res);
  }

}
