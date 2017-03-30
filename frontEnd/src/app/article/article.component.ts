import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketIOService } from '../socket.io/socket-io.service';
import { LocalStorageService } from '../technical/local-storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})


export class ArticleComponent implements OnInit, OnDestroy {

  // @Input() name: string;

  articlesList: Article[];
  categoryName: string;
  publishedArticles: Article[];
  private sub: any;
  constructor(private articleService: ArticleService, private route: ActivatedRoute, private socketService: SocketIOService, private localStorageService: LocalStorageService) {
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.categoryName = params['categoryName']; // (+) converts string 'id' to a number

      /**
       * Send user traking information when he request category
       */
      
      /**Get user ID and begin emitting */
      let userId =this.localStorageService.getUserId();
      this.socketService.sendUserCategoryBrowsingEvent(userId,this.categoryName);

      /** */
      this.publishedArticles = [];
      this.articleService.getArticles(this.categoryName).then(
        (response) => {
          this.articlesList = response;
          this.articlesList.forEach(article => {
            if (article.date) {
              this.publishedArticles.push(article);
            }
          }, this);
          console.log(this.publishedArticles);
        }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
