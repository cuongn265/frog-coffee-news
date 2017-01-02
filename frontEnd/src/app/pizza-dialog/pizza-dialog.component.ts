import { Article } from './../article/article';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-pizza-dialog',
  templateUrl: './pizza-dialog.component.html',
  styleUrls: ['./pizza-dialog.component.scss']
})
export class PizzaDialogComponent implements OnInit {

  articleDetail: Article = new Article();
  data: Object;
  constructor(public dialogRef: MdDialogRef<PizzaDialogComponent>) {
  }

  ngOnInit() {
    this.data = this.dialogRef.componentInstance;
    this.articleDetail = this.dialogRef.componentInstance.articleDetail;
  }

}
