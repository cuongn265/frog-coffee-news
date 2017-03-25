import { Comment } from '../comment';
import { Category } from '../category'
export class Article {
    public _id: String;
    public category: Category;
    public title: Text;
    public description: Text;
    public content: Text;
    public date: Date;
    public header_image: String;
    public author: String;
    public source: String;
    // public published: boolean;
    // public comments: Comment[];
}
