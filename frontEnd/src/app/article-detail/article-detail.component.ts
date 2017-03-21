import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../user/user';
import { Comment } from '../comment';

import { MdMenuTrigger } from '@angular/material/menu/menu';
import { MdDialogRef, MdDialog } from '@angular/material/dialog';
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
  private commentList: Object;
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
    private dialog: MdDialog

  ) { }

  ngOnInit() {
    // get user profile from localStorage
    if (localStorage.getItem('profile')) {
      let profileJSON = JSON.parse(localStorage.getItem('profile'));
      this.user.email = profileJSON.email;
      this.user.username = profileJSON.nickname;
      this.user.first_name = profileJSON.first_name;
      this.user.last_name = profileJSON.last_name;
      this.user.phone = profileJSON.telephoneNumber;
      this.user._id = profileJSON._id;
    }

    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.articleId = params['articleId'];
      this.articleService.getArticleDetail(this.articleId).then(article => {
        this.article = article;
        console.log(article);
        console.log("+++++++++++++++++++++++++++++++++++++");
        console.log(article[0]);
        this.commentList = this.article['comments'];
      });

      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.relatedArticleList = response;
          console.log(this.relatedArticleList.length);
        }
      );
    });

    this.shareUrl = window.location.href.toString();
  }

  getCommentPeriod(timeStamp: string) {
    return this.articleService.getTimeDistance(timeStamp);
  }

  comment() {
    this.submittingComment = true;
    this.newComment.content = this.commentContent;
    this.newComment.first_name = this.user.first_name;
    this.newComment.last_name = this.user.last_name;
    this.newComment.article_id = this.articleId;
    this.newComment.article_id = this.user._id;

    if (this.commentContent == null) {
      this.submittingComment = false;
      return;
    }
    else {
      this.articleService.postComment(this.newComment).then(response => {
        this.submittingComment = false;
        this.commentContent = null;
        this.articleService.getArticleDetail(this.articleId).then(article => {
          this.article = article[0];
          this.commentList = this.article['comments'];
        });
      });
    }
  }

  removeComment(event, comment) {
    event.stopPropagation();
    this.dialogRemoveRef = this.dialog.open(RemoveCommentDialogComponent, {
      disableClose: false
    });
    this.dialogRemoveRef.afterClosed().subscribe(result => {
      this.dialogRemoveRef = null;
      if (result === 'yes') {
        this.articleService.removeComment(comment).then(response => {
          this.articleService.getArticleDetail(this.articleId).then(article => {
            this.article = article[0];
            this.commentList = this.article['comments'];
          });
        });
      }
      else {
        return;
      }
    });
  }

  modifyComment(event, comment) {
    event.stopPropagation();
    this.dialogModifyRef = this.dialog.open(ModifyCommentDialogComponent, {
      disableClose: false,
      width: '600px'
    });
    this.storedComment = comment;
    this.dialogModifyRef.componentInstance.selectedComment = comment;
    this.dialogModifyRef.afterClosed().subscribe(result => {
        this.articleService.getArticleDetail(this.articleId).then(article => {
          console.log(article)
          this.article = article;
          this.commentList = this.article['comments'];
        })
    });
  }

  closeCommentMenu() {
    this.trigger.closeMenu();
  }


}
