import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../user/user';
import { Comment } from '../comment';
import { LocalStorageService } from '../technical/local-storage.service';
import { SocketIOService } from '../socket.io/socket-io.service';


import { MdMenuTrigger } from '@angular/material/';
import { MdDialogRef, MdDialog } from '@angular/material';
import { ModifyCommentDialogComponent } from '../comment-dialog/modify-comment-dialog/modify-comment-dialog.component';
import { RemoveCommentDialogComponent } from '../comment-dialog/remove-comment-dialog/remove-comment-dialog.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  providers: [ArticleService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ArticleDetailComponent implements OnInit {

  private sub: any;
  private categoryName: string;
  private articleId: string;
  private article: Article;
  private commentList: Comment[];
  private relatedArticleList: Article[];
  private shareUrl;
  private loggedIn: boolean = false;
  private user: User = new User();
  private storedComment: Comment = new Comment();
  private newComment: Comment = new Comment();
  private submittingComment: boolean = false;
  private commentContent: Text;

  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  dialogModifyRef: MdDialogRef<ModifyCommentDialogComponent>;
  dialogRemoveRef: MdDialogRef<RemoveCommentDialogComponent>;

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private authService: AuthService,
    private dialog: MdDialog,
    private socketService: SocketIOService,
    private localStorageService: LocalStorageService

  ) { }

  ngOnInit() {
    // get user profile from localStorage
    let userId = this.localStorageService.getUserId();



    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.articleId = params['articleId'];
      let articleId = this.articleId;
      this.articleService.getArticleDetail(this.articleId).then(article => {
        /**Emit user category track */
        this.socketService.sendUserCategoryBrowsingEvent(String(userId), String(article.category));
        this.socketService.sendUserTagsBrowsingEvent(userId, article.tags);
        /**Emit increased view count */
        this.socketService.sendIncreaseViewCountEvent(this.articleId);
        this.article = article;
        this.articleService.getComments(articleId).then(res => {
          this.commentList = res.comments;
        })
        // this.commentList = this.article['comments'];
      });

      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.relatedArticleList = response;
        }
      );
    });

    this.shareUrl = window.location.href.toString();
  }
}
