import { Comment } from '../comment';

export class Article {
    public idArticle: number;
    public Category: number;
    public articleHeaderTitle: Text;
    public articleHeaderDescription: Text;
    public articleContent: Text;
    public date: Date;
    public headerImagePath: String;
    public author: String;
    public source: String;
    public comments: Comment[];
}
