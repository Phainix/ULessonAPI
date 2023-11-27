import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './utils/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseTransformInterceptor } from './utils/interceptors/response.interceptor';
import { AuthGuard } from './utils/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },{
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
