import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetTokenArgs } from './dto/getToken.dto';
import { UserViewModel } from './views/user.model';
import { UserRepository } from './user.repository.interface';
import { sign } from 'jsonwebtoken';
import { User } from './domain/user';
import { v4 } from 'uuid';

@Injectable()
export class UserApplicationService {
  private readonly logger = new Logger(UserApplicationService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  async getUserToken(args: GetTokenArgs): Promise<UserViewModel> {
    let user = await this.userRepository.getUserByEmail(args.email);
    if (!user) {
      user = await this.userRepository.createUser(
        new User({
          id: v4(),
          name: '',
          email: args.email,
        }),
      );
    }

    let jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY', '');
    const idToken = sign(
      { email: user.email, id: user.id, name: user.name },
      jwtSecretKey,
    );

    return new UserViewModel({
      idToken,
      email: user.email,
    });
  }
}
