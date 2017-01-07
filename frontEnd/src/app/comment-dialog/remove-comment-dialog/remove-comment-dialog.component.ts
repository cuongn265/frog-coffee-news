import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-comment-dialog',
  templateUrl: './remove-comment-dialog.component.html',
  styleUrls: ['./remove-comment-dialog.component.scss']
})
export class RemoveCommentDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<RemoveCommentDialogComponent>) { }

  ngOnInit() {
  }

}
