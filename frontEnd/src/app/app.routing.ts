import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
// import { AppComponent } from './app.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AuthGuard } from './auth-guard.service';
import { ArticleEditorComponent } from './articles-list/article-editor/article-editor.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: ':categoryName', component: ArticleComponent, },
      { path: ':categoryName/:articleId', component: ArticleDetailComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users-list', component: UsersListComponent },
      { path: 'articles-list', component: ArticlesListComponent },
      { path: 'articles-list/new', component: ArticleEditorComponent },
    ]
  }
];
