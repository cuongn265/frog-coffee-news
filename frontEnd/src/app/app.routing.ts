import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';

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
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];
