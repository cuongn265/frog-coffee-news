/// <reference types="aws-sdk" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Article } from "../../article/article";
import { Tag } from "../../article/tag";
import { Category } from "../../category";
import { ArticleService } from "../../article/article.service";
import { CategoryService } from "../../category.service";
import { MdDialogRef } from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import * as AWS from 'aws-sdk';
require('dotenv').config()

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  providers: [ArticleService, CategoryService]
})
export class ArticleEditorComponent implements OnInit {

  articleTags: Tag[] = [];

  autocompleteTags: string[] = [];

  submittedTags: {
    tag_id: string,
    name: string
  }[] = [];

  articleDetail: Article = new Article();
  categories: Category[];
  selectedCategory: Category;
  sub: any;
  isCreate: boolean = true;
  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  isLoading = false;

  constructor(private articleService: ArticleService,
    private categoryService: CategoryService,
    private _location: Location,
    private route: ActivatedRoute,

    private snackBar: MdSnackBar) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 1600;
    this.cropperSettings.height = 900;
    this.cropperSettings.croppedWidth = 1600;
    this.cropperSettings.croppedHeight = 900;

    /**
     * Get tags first
     */
    articleService.getTags().then((tags) => {
      this.articleTags = tags;
      console.log(this.articleTags);
      for (let tag of tags) {
        this.autocompleteTags.push(tag.name);
      }
      //console.log(this.articlesTags);
    });
    this.data = {};
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    this.articleDetail.header_image_name = file.name;
    myReader.readAsDataURL(file);
  }

  cropped(bounds: Bounds, article: any) {
    console.log('on cropped');

  }

  onApplyCrop(article: any) {
    this.isLoading = true;
    AWS.config.credentials = {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey
    }
    let _id = (+new Date).toString().concat('_') + this.articleDetail.header_image_name;

    let s3Bucket = new AWS.S3({
      params: { Bucket: 'cuongngo-news', Key: _id, ACL: 'public-read' },
    })

    let buf = new Buffer(article.image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    let xdata: any = {
      Key: _id,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };
    let self = this;
    s3Bucket.putObject(xdata, function (err, data) {
      if (err) {
        console.log(err);
        console.log('Error uploading data: ', data);
      } else {
        console.log('succesfully uploaded the image!');
        self.articleDetail.header_image = 'https://s3-ap-southeast-1.amazonaws.com/cuongngo-news/' + _id
        self.isLoading = false;
      }
    });
  }

  // TODO: Convert image from url to base 64

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.articleService.getArticleDetail(params['id']).then(res => {
          this.articleDetail = res;
          console.log('Article Detail');
          console.log(this.articleDetail);
          this.data.image = res.header_image;
          var image: any = new Image();
          image.src = res.header_image;
          this.cropper.setImage(image);
        });
        this.isCreate = false;
      }
      this.categoryService.getCategories().then((res) => {
        this.categories = res;
      });
    });
  }

  onSubmit(article: any): void {

    article.header_image = this.articleDetail.header_image;
    if (article.tags) {
      for (let tag of article.tags) {
        if (tag.tag_id) {
          this.submittedTags.push({
            tag_id: tag.tag_id,
            name: tag.name
          });
        }
        else {
          this.submittedTags.push({
            tag_id: tag._id,
            name: tag.name
          });
        }
      }
      article.tags = this.submittedTags;
    }
    console.log('you submitted value:', article);


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
