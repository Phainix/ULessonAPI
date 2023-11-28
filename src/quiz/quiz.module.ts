import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { QuizController } from './quiz.controller';
import { QuizApplicationService } from './quiz.service';
import { QuizRepository } from './quiz.repository.interface';
import { QuizDatabase } from './quiz.database';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  controllers: [QuizController],
  providers: [
    QuizApplicationService,
    {
      inject: [PrismaService],
      provide: QuizRepository,
      useFactory: (prisma: PrismaService): unknown => new QuizDatabase(prisma),
    },
  ],
  imports: [UserModule],
  exports: [QuizApplicationService],
})
export class QuizModule {}
