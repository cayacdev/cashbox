export class Auth {
  constructor(
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
  ) {}

  get token(): string {
    return this._token
  }
}
