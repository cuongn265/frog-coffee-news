import { Component, OnInit } from '@angular/core';
import { Comment } from '../../comment';
import {MdDialogRef} from '@angular/material/dialog';
import { ArticleService } from '../../article/article.service';

@Component({
  selector: 'app-modify-comment-dialog',
  templateUrl: './modify-comment-dialog.component.html',
  styleUrls: ['./modify-comment-dialog.component.scss'],
  providers: [ArticleService]
})
export class ModifyCommentDialogComponent implements OnInit {

  selectedComment: Comment = new Comment();
  commentContent: Text;
  constructor(public dialogRef: MdDialogRef<ModifyCommentDialogComponent>,
              private articleService: ArticleService) { }

  ngOnInit() {
    console.log("User modify this comment");
    console.log(this.selectedComment);
  }

  submit(comment: Comment){
    this.articleService.putComment(comment).then(response => {
      console.log(response);
    });
  }
}
