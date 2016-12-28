import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

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
  // {
  //   path: 'article/:categoryName',
  //   component: ArticleComponent,
  // },
  {
    path: 'login',
    component: LoginComponent,
  }
];
