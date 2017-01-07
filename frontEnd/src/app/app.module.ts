import { UserComponent } from './user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';

import { MaterialModule } from '@angular/material';
import { CollapseDirective } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { AppRoutes } from './app.routing';
import { LoginComponent } from './login/login.component';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth-guard.service';
import { UsersListComponent } from './users-list/users-list.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';

import {
  DataTableModule, ButtonModule, InputTextModule, DialogModule,
  DataGridModule, MenuModule, ContextMenuModule, PanelModule, ChartModule
} from 'primeng/primeng';
import { PizzaDialogComponent } from './pizza-dialog/pizza-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2SelectModule } from 'ng2-material-select';
import { CKEditorModule } from 'ng2-ckeditor';
import { Slide2Component } from './slide-2/slide-2.component';
import { ModifyCommentDialogComponent } from './comment-dialog/modify-comment-dialog/modify-comment-dialog.component';
import { RemoveCommentDialogComponent } from './comment-dialog/remove-comment-dialog/remove-comment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    CollapseDirective,
    LoginComponent,
    ArticleDetailComponent,
    AdminComponent,
    UserComponent,
    UsersListComponent,
    ArticlesListComponent,
    PizzaDialogComponent,
    PizzaDialogComponent,
    DashboardComponent,
    ModifyCommentDialogComponent,
    RemoveCommentDialogComponent
    DashboardComponent,
    Slide2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    ShareButtonsModule,
    DataTableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DataGridModule,
    MenuModule,
    ContextMenuModule,
    PanelModule,
    ChartModule,
    Ng2SelectModule,
    CKEditorModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    PizzaDialogComponent,
    RemoveCommentDialogComponent,
    ModifyCommentDialogComponent
  ],
})
export class AppModule { }
