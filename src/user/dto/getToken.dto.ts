import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetTokenArgs {
  @IsEmail()
  @IsNotEmpty({ message: 'Email must be specified' })
  email: string;
}
