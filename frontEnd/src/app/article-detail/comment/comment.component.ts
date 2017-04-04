import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { MdDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ArticleService } from './../../article/article.service';
import { Comment } from './../../comment';
import { AuthService } from './../../auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comments: Comment[];
  comment: Comment;
  sub: any
  articleId: string;

  constructor(private authService: AuthService, 
              private articleService: ArticleService, 
              private route: ActivatedRoute,
              private dialog: MdDialog) { }

  ngOnInit() {
    this.comment = { _id: '', user_id: this.authService.userProfile.identities[0].user_id, text: '', date: new Date() };
    this.sub = this.route.params.subscribe(params => {
      this.articleId = params['articleId']; // (+) converts string 'id' to a number
    });
  }

  getCommentPeriod(timeStamp: string) {
    // return this.articleService.getTimeDistance(timeStamp);
  }

  onSubmit(comment: Comment) {
    this.articleService.postComment(this.articleId, comment).then(res => {
        this.articleService.getComments(this.articleId).then(res => this.comments = res.comments)
        this.comment.text = ''
      }
    );
  }

  onOpenConfirmDialog(commentId: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        console.log(commentId);
        this.onDelete(this.articleId, commentId);
      }
    })
  }

  onDelete(articleId: string, commentId: string) {
    this.articleService.removeComment(articleId, commentId);
  }

  removeComment(event, comment) {
    // event.stopPropagation();
    // this.dialogRemoveRef = this.dialog.open(RemoveCommentDialogComponent, {
    //   disableClose: false
    // });
    // this.dialogRemoveRef.afterClosed().subscribe(result => {
    //   this.dialogRemoveRef = null;
    //   if (result === 'yes') {
    //     this.articleService.removeComment(comment).then(response => {
    //       this.articleService.getArticleDetail(this.articleId).then(article => {
    //         this.article = article[0];
    //         this.commentList = this.article['comments'];
    //       });
    //     });
    //   }
    //   else {
    //     return;
    //   }
    // });
  }

  modifyComment(event, comment) {
    // event.stopPropagation();
    // this.dialogModifyRef = this.dialog.open(ModifyCommentDialogComponent, {
    //   disableClose: false,
    //   width: '600px'
    // });
    // this.storedComment = comment;
    // this.dialogModifyRef.componentInstance.selectedComment = comment;
    // this.dialogModifyRef.afterClosed().subscribe(result => {
    //   this.articleService.getArticleDetail(this.articleId).then(article => {
    //     console.log(article)
    //     this.article = article;
    //     this.commentList = this.article['comments'];
    //   })
    // });
  }

  closeCommentMenu() {
    // this.trigger.closeMenu();
  }
}
