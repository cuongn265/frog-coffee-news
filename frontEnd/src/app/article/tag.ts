import { Article } from "./article";
export class Tag {
  public _id: String;
  public name: Text;
  public description: Text;
  public articles: Article[];
}