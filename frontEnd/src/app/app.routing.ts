import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AuthGuard } from './auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: UserComponent,
  },
  {
    path: 'news/:categoryName',
    component: ArticleComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'news/:categoryName/:articleId',
    component: ArticleDetailComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];
