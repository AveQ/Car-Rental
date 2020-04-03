export class User {
  constructor(
    public id: string,
    public email: string,
    private token: string,
    private tokenExpirationDate: Date,
    public isAdmin: string,
    public historyId: string
  ) {}
  get myToken() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate){
      return null;
    }
    return this.token;
  }
}
