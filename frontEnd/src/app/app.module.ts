import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { Ng2OrderModule } from 'ng2-order-pipe';
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

import { UserService } from "./user/user.service";
import { SocketIOService } from './socket.io/socket-io.service';
import { LocalStorageService } from './technical/local-storage.service';

import {
  DataTableModule, ButtonModule, InputTextModule, DialogModule,
  DataGridModule, MenuModule, ContextMenuModule, PanelModule, ChartModule
} from 'primeng/primeng';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { Slide2Component } from './slide-2/slide-2.component';
import { ModifyCommentDialogComponent } from './comment-dialog/modify-comment-dialog/modify-comment-dialog.component';
import { RemoveCommentDialogComponent } from './comment-dialog/remove-comment-dialog/remove-comment-dialog.component';
import { Ng2PaginationModule} from 'ng2-pagination';
import { ReversePipe } from './reverse.pipe';
import { ArticleEditorComponent } from './articles-list/article-editor/article-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { CommentComponent } from './article-detail/comment/comment.component';
import { MentionModule } from 'angular2-mentions/mention';
import { SwiperModule } from 'angular2-useful-swiper';
import { SwiperComponent } from './swiper/swiper.component';
import { LandingComponent } from './landing/landing.component';
import { CategoryTimelineComponent } from './landing/category-timeline/category-timeline.component'; //or for angular-cli the path will be ../../node_modules/angular2-useful-swiper 


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
    DashboardComponent,
    ModifyCommentDialogComponent,
    RemoveCommentDialogComponent,
    DashboardComponent,
    Slide2Component,
    ReversePipe,
    ArticleEditorComponent,
    ConfirmDialogComponent,
    ImageCropperComponent,
    CommentComponent,
    SwiperComponent,
    LandingComponent,
    CategoryTimelineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
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
    BrowserAnimationsModule,
    MentionModule,
    SwiperModule,
    Ng2OrderModule,
    InfiniteScrollModule
  ],
  providers: [AuthGuard, AuthService, SocketIOService, LocalStorageService],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    RemoveCommentDialogComponent,
    ModifyCommentDialogComponent
  ],
})
export class AppModule { }
