import { BadRequestException } from '@nestjs/common';

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;

  constructor({
    id,
    name,
    email,
  }: {
    name: string;
    id: string;
    email: string;
  }) {
    this.rejectEmptyEmail(email);

    this.name = name;
    this.id = id;
    this.email = email;
  }

  private rejectEmptyEmail(email: string): void {
    if (email === '') {
      throw new BadRequestException('User must have a email');
    }
  }
}
