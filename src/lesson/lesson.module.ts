import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { LessonController } from './lesson.controller';
import { LessonApplicationService } from './lesson.service';
import { LessonRepository } from './lesson.repository.interface';
import { LessonDatabase } from './lesson.database';
import { NoteRepository } from './note.repository.interface';
import { NoteDatabase } from './note.database';

@Global()
@Module({
  controllers: [LessonController],
  providers: [
    LessonApplicationService,
    {
      inject: [PrismaService],
      provide: LessonRepository,
      useFactory: (prisma: PrismaService): unknown =>
        new LessonDatabase(prisma),
    },
    {
      inject: [PrismaService],
      provide: NoteRepository,
      useFactory: (prisma: PrismaService): unknown => new NoteDatabase(prisma),
    },
  ],
  imports: [],
  exports: [LessonApplicationService],
})
export class LessonModule {}
