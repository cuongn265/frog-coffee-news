import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';
import { Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [ArticleService]
})


export class ArticleComponent implements OnInit, OnDestroy {

  @Input() name: string;

  articlesList: Article[];
  categoryName: string;
  private sub: any;

  public myInterval: number = 0;
  public noWrapSlides: boolean = false;
  public slides: any[] = [];

  public addSlide(): void {
    let newWidth = 600 + this.slides.length + 1;
    this.slides.push({
      image: `//placekitten.com/${newWidth}/300`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
  }

  public removeSlide(index: number): void {
    this.slides.splice(index, 1);
  }

  constructor(private articleService: ArticleService) {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }


  ngOnInit() {

    this.articleService.getArticles(this.name).then(
      (response) => {
        this.articlesList = response;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
