import { ActivatedRoute } from '@angular/router';
import { Comment } from './../../comment';
import { Component, OnInit, Inject } from '@angular/core';
import { ArticleService } from '../../article/article.service';
import { MdDialogRef } from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-modify-comment-dialog',
  templateUrl: './modify-comment-dialog.component.html',
  styleUrls: ['./modify-comment-dialog.component.scss'],
  providers: [ArticleService]
})
export class ModifyCommentDialogComponent implements OnInit {

  selectedComment: Comment;
  data: any;

  constructor(public dialogRef: MdDialogRef<ModifyCommentDialogComponent>,
    private articleService: ArticleService,
    @Inject(MD_DIALOG_DATA) data: any) {
      this.data = data;
  }

  ngOnInit() {
    this.selectedComment = this.data.comment;
  }

  onSubmit(comment: Comment) {
    console.log(comment)
    this.articleService.putComment(this.data.articleId, comment).then(response => {
      this.dialogRef.close('yes')
    });
  }
}
