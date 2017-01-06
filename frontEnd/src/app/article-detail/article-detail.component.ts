import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../article/article';
import { ArticleService } from '../article/article.service';
import { UserService } from '../user/user.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../auth.service';
import { User } from '../user/user';
import { Comment } from '../comment';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  providers: [ArticleService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ArticleDetailComponent implements OnInit {

  private sub: any;
  private categoryName: string;
  private articleId: number;
  private article: Article;
  private commentList: Object;
  private relatedArticleList: Article[];
  private shareUrl;
  private loggedIn: boolean = false;
  private user: User = new User();

  private newComment: Comment = new Comment();
  private submittingComment: boolean = false;
  private commentContent: Text;
  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private location: Location,
              private authService: AuthService
  ) { }

  ngOnInit() {
    // get user profile from localStorage
    if(localStorage.getItem('profile')){
      let profileJSON = JSON.parse(localStorage.getItem('profile'));
      this.user.email = profileJSON.email;
      this.user.username = profileJSON.nickname;
      this.user.firstName = profileJSON.firstName;
      this.user.lastName = profileJSON.lastName;
      this.user.phone = profileJSON.telephoneNumber;
      this.user.idUser = profileJSON.user_id;
    }
    
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName'];
      this.articleId = +params['articleId'];
      this.articleService.getArticleDetail(this.categoryName, this.articleId).then(article => {
        this.article = article[0];
        this.commentList = this.article['comments'];
      });

      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.relatedArticleList = response;
          console.log(this.relatedArticleList.length);
        }
      );
    });
    
    this.shareUrl = window.location.href.toString();
  }

  getCommentPeriod(timeStamp: string){
    return this.articleService.getTimeDistance(timeStamp);
  }

  comment(){
    this.submittingComment = true;
    this.newComment.content = this.commentContent;
    this.newComment.firstName = this.user.firstName;
    this.newComment.lastName = this.user.lastName;
    this.newComment.idArticle = this.articleId;
    this.newComment.idUser = this.user.idUser;
    this.articleService.postComment(this.newComment).then(response => {
      
      this.submittingComment = false;
      this.commentContent = null;
       this.articleService.getArticleDetail(this.categoryName, this.articleId).then(article => {
        this.article = article[0];
        this.commentList = this.article['comments'];
      });
    })
  }
}
