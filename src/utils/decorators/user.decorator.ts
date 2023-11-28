import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserViewModel } from 'src/user/views/user.model';

type UserViewModelKey = keyof UserViewModel;

export const GetUser = createParamDecorator(
  (data: UserViewModelKey, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
