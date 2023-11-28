export class UserViewModel {
  idToken: string;
  email: string;
  id: string;

  constructor({
    idToken,
    email,
    id,
  }: {
    idToken: string;
    email: string;
    id: string;
  }) {
    this.idToken = idToken;
    this.email = email;
    this.id = id;
  }
}
