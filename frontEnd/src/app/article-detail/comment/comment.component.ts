import { ModifyCommentDialogComponent } from './../../comment-dialog/modify-comment-dialog/modify-comment-dialog.component';
import { ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { MdDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ArticleService } from './../../article/article.service';
import { Comment } from './../../comment';
import { AuthService } from './../../auth.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { UserService } from "../../user/user.service";
import { LocalStorageService } from "../../technical/local-storage.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [UserService]
})
export class CommentComponent implements OnInit {

  @Input()
  comments: Comment[];
  comment: Comment;
  sub: any
  articleId: string;
  participants: {
    user_id: string,
    username: string
  }[] = [];
  order = 'text';
  reverse = false;
  isActive = 'best';
  commentLimit = 10;

  commentText: string = "";
  private mentionParticipants: string[] = [];
  private mentionedParticipants: string[] = [];

  private numberOfMentionedParticipant: number = 0;

  constructor(private authService: AuthService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MdDialog,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    let user_id = this.authService.authenticated() ? this.authService.userProfile.identities[0].user_id : '';
    this.comment = { _id: '', user_id: user_id, text: '', date: new Date() };
    this.sub = this.route.params.subscribe(params => {
      this.articleId = params['articleId'];

      this.articleService.getParticipants(this.articleId).then(res => {
        this.participants = res;
        for (let participant of this.participants) {
          if (participant.user_id !== this.localStorageService.getUserId()) {
            this.mentionParticipants.push(participant.username);
          }
        }
      });
    });
  }

  updateMentionedUser(text: string) {
    this.mentionedParticipants = text.match(/\@(\S+)/g);
  }

  pushUserToMentionedList(user: string) {
    this.mentionedParticipants.push(user);
  }


  mentioned(mention: string) {
    return mention;
  }

  getUsernameByUserId(userId: string) {
    let username = '';
    if (this.participants) {
      for (let i = 0; i < this.participants.length; i++) {
        let participant = this.participants[i];
        if (participant.user_id == userId) {
          username = participant.username;
          break;
        }
      }
    }
    return username;
  }

  getNumberOfMentionedParticipant(text: string) {
    return (text.match(/@/g) || []).length;
  }
  getCommentPeriod(timeStamp: string) {
    return this.articleService.getTimeDistance(timeStamp);
  }

  onSubmit(comment: Comment) {
    /* Post comment */
    this.articleService.postComment(this.articleId, comment).then(res => {
      this.articleService.getComments(this.articleId).then(res => this.comments = res.comments);
      this.comment.text = '';

     
      if (this.mentionedParticipants != null && this.mentionedParticipants.length > 0) {
        let user_id = this.authService.authenticated() ? this.authService.userProfile.identities[0].user_id : '';
        let mentionedParticipants = this.getMentionedParticipantIdList();
        this.articleService.mentionParticipants(this.articleId, user_id, mentionedParticipants);
      }
    });
  }

 getMentionedParticipantIdList(): any[] {
    let taggedUserIdArray = [];
    for (let tag of this.mentionedParticipants) {
      for (let user of this.participants) {
        if (tag.slice(1) == user.username) {
          taggedUserIdArray.push(user.user_id);
        }
      }
    }
    return taggedUserIdArray;
  }

  getTaggedParticipantIdList(): any[] {
    let taggedUserIdArray = [];
    for (let tag of this.mentionedParticipants) {
      for (let user of this.participants) {
        if (tag.slice(1) == user.username) {
          taggedUserIdArray.push(user.user_id);
        }
      }
    }
    return taggedUserIdArray;
  }

  onOpenConfirmDialog(commentId: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        this.onDelete(this.articleId, commentId);
      }
    })
  }

  onDelete(articleId: string, commentId: string) {
    this.articleService.removeComment(articleId, commentId).then(res =>
      this.articleService.getComments(this.articleId).then(res => this.comments = res.comments)
    );
  }

  onModify(event, comment) {
    let dialogRef = this.dialog.open(ModifyCommentDialogComponent, {
      data: {
        comment: comment,
        articleId: this.articleId
      }
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      this.articleService.getComments(this.articleId).then(res => this.comments = res.comments)
    })
  }

  loadMore() {
    this.commentLimit += 10;
    if (this.commentLimit > this.comments.length) {
      this.commentLimit = this.comments.length;
    }
  }
}
