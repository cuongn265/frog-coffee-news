import { Comment } from '../comment';

export class Article {
    private idArticle: number;
    private articleHeaderTitle: Text;
    private articleHeaderDescription: Text;
    private date: String;
    private headerImagePath: String;
    private author: String;
    private source: String;
    private comments: Comment[];
}
