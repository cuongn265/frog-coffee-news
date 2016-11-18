import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  },
  {
    path: 'articles',
    component: ArticleComponent,
  },
  {
    path: 'article/:categoryName',
    component: ArticleComponent,
  }
];
