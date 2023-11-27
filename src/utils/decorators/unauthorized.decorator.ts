import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const AllowUnauthorizedRequest = (): CustomDecorator<string> =>
  SetMetadata('allowUnauthorizedRequest', true);
