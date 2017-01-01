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

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    CollapseDirective,
    LoginComponent,
    ArticleDetailComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    ShareButtonsModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
