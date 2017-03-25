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
import { CKEditorModule } from 'ng2-ckeditor';
import { Slide2Component } from './slide-2/slide-2.component';
import { ModifyCommentDialogComponent } from './comment-dialog/modify-comment-dialog/modify-comment-dialog.component';
import { RemoveCommentDialogComponent } from './comment-dialog/remove-comment-dialog/remove-comment-dialog.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import { ReversePipe } from './reverse.pipe';
import { ArticleEditorComponent } from './articles-list/article-editor/article-editor.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SnackbarComponent } from './snackbar/snackbar.component';

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
    RemoveCommentDialogComponent,
    DashboardComponent,
    Slide2Component,
    ReversePipe,
    ArticleEditorComponent,
    SnackbarComponent
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
    CKEditorModule,
    Ng2PaginationModule,
    BrowserAnimationsModule
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
