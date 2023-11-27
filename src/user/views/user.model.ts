export class UserViewModel {
  idToken: string;
  email: string;

  constructor({
    idToken,
    email,
  }: {
    idToken: string;
    email: string;
  }) {
    this.idToken = idToken;
    this.email = email;
  }
}
