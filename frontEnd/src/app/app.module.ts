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
import { AlertModule } from 'ng2-bootstrap';
import { CarouselModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    CollapseDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    AlertModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
