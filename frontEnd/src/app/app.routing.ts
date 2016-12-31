import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppComponent,
  },
  {
    path: ':categoryName/articles',
    component: ArticleComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: ':categoryName/articles/:articleId',
    component: ArticleDetailComponent
  }
];
