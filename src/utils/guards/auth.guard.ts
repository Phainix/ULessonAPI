import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowUnauthorizedRequest = this.reflector.getAllAndOverride<boolean>(
      'allowUnauthorizedRequest',
      [context.getHandler(), context.getClass()],
    );

    if (allowUnauthorizedRequest) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new BadRequestException('Missing authorization headers');
    }

    const idToken = (request.headers.authorization as string).split(' ')[1];

    if (!idToken) {
      throw new UnauthorizedException(
        'Authorization headers is missing or not set properly',
      );
    }

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    const verified = verify(idToken, jwtSecretKey);
    if (verified) {
      request.user = verified;
      return true;
    }
    throw new UnauthorizedException('Authorization header is invalid');
  }
}
