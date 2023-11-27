import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { UserDatabase } from './user.database';
import { UserRepository } from './user.repository.interface';
import { UserApplicationService } from './user.service';

@Global()
@Module({
  controllers: [UserController],
  providers: [
    UserApplicationService,
    {
      inject: [PrismaService],
      provide: UserRepository,
      useFactory: (prisma: PrismaService): unknown => new UserDatabase(prisma),
    },
  ],
  imports: [],
  exports: [UserApplicationService],
})
export class UserModule {}
