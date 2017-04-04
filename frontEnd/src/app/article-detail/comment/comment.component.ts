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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getCommentPeriod(timeStamp: string) {
    // return this.articleService.getTimeDistance(timeStamp);
  }

  comment() {
    // this.submittingComment = true;
    // this.newComment.content = this.commentContent;
    // this.newComment.first_name = this.user.first_name;
    // this.newComment.last_name = this.user.last_name;
    // this.newComment.article_id = this.articleId;
    // this.newComment.article_id = this.user._id;
    //
    // if (this.commentContent == null) {
    //   this.submittingComment = false;
    //   return;
    // }
    // else {
    //   this.articleService.postComment(this.newComment).then(response => {
    //     this.submittingComment = false;
    //     this.commentContent = null;
    //     this.articleService.getArticleDetail(this.articleId).then(article => {
    //       this.article = article[0];
    //       this.commentList = this.article['comments'];
    //     });
    //   });
    // }
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
