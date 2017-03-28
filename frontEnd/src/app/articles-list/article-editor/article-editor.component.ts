/// <reference types="aws-sdk" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Article } from "../../article/article";
import { Category } from "../../category";
import { ArticleService } from "../../article/article.service";
import { CategoryService } from "../../category.service";
import { MdDialogRef } from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import * as AWS from 'aws-sdk';
require('dotenv').config()

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  providers: [ArticleService, CategoryService]
})
export class ArticleEditorComponent implements OnInit {

  articleDetail: Article = new Article();
  categories: Category[];
  selectedCategory: Category;
  sub: any;
  isCreate: boolean = true;
  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    private _location: Location,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar) {
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.cropperSettings.width = 1600;
      this.cropperSettings.height = 900;
      this.cropperSettings.dynamicSizing = true;
      this.data = {};
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    this.articleDetail.header_image_name = file.name;
    myReader.readAsDataURL(file);
  }

  cropped(bounds:Bounds, article: any) {
    console.log('on cropped');

  }

  onApplyCrop(article: any) {
    AWS.config.credentials = {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey
    }
    let _id = this.articleDetail.header_image_name + (+new Date).toString();

    let s3Bucket = new AWS.S3( {
      params: {Bucket: 'cuongngo-news', Key: _id, ACL: 'public-read'},
    })

    let buf = new Buffer(article.image.replace(/^data:image\/\w+;base64,/, ""),'base64')
    console.log('buffer');
    console.log(buf);
    let xdata: any = {
      Key: _id,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };
    s3Bucket.putObject(xdata, function(err, data){
        if (err) {
          console.log(err);
          console.log('Error uploading data: ', data);
        } else {
          console.log('succesfully uploaded the image!');
        }
    });
    this.articleDetail.header_image = 'https://s3-ap-southeast-1.amazonaws.com/cuongngo-news/' + _id
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.articleService.getArticleDetail(params['id']).then(res => this.articleDetail = res);
        this.isCreate = false;
      }
      this.categoryService.getCategories().then((res) => {
        this.categories = res;
      });
    });
  }

  onSubmit(article: any): void {
    console.log('you submitted value:', article);
    article.header_image = this.articleDetail.header_image;
    if (article._id === undefined) {
      this.articleService.postArticle(article).then((res) => {
        this.openSnackBar('Article is created successfully', null);
      }).catch(res => {
        this.openSnackBar('An error occurred', null);
      });
    } else {
      this.articleService.putArticle(article).then((res) => {
        this.openSnackBar('Article is updated successfully', null);
      }).catch(res => {
        this.openSnackBar('An error occurred', null);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onCancel() {
    this._location.back();
  }
}
