import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { GetTokenArgs } from './dto/getToken.dto';
import { UserViewModel } from './views/user.model';
import { UserApplicationService } from './user.service';
import { AllowUnauthorizedRequest } from 'src/utils/decorators/unauthorized.decorator';

@Controller('user')
@AllowUnauthorizedRequest()
export class UserController {
  constructor(private readonly userService: UserApplicationService) {}

  @Post('token')
  @HttpCode(200)
  getUserToken(@Body() payload: GetTokenArgs): Promise<UserViewModel> {
    return this.userService.getUserToken(payload);
  }
}
