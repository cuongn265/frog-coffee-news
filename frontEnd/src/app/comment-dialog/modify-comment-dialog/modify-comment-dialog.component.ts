import { ActivatedRoute } from '@angular/router';
import { Comment } from './../../comment';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../article/article.service';

@Component({
  selector: 'app-modify-comment-dialog',
  templateUrl: './modify-comment-dialog.component.html',
  styleUrls: ['./modify-comment-dialog.component.scss'],
  providers: [ArticleService]
})
export class ModifyCommentDialogComponent implements OnInit {

  selectedComment: Comment;

  constructor(public dialogRef: MdDialogRef<ModifyCommentDialogComponent>,
    private articleService: ArticleService) {
  }

  ngOnInit() {
    this.selectedComment = this.dialogRef.config.data.comment;
  }

  onSubmit(comment: Comment) {
    console.log(comment)
    this.articleService.putComment(this.dialogRef.config.data.articleId, comment).then(response => {
      this.dialogRef.close('yes')
    });
  }
}
