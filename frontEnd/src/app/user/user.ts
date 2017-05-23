export class User {
  public _id: string;
  public username: string;
  public picture: string ;
  public first_name: string;
  public last_name: string;
  public phone: string;
  public email: string;
  public role: string;
  public enable: boolean;
  public identities: Array<{
    user_id: string,
    provider: string,
    connection: string,
    isSocial: boolean
  }>;
}
