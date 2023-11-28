import { PrismaService } from 'src/utils/prisma/prisma.service';
import { Lesson as DbLesson } from '.prisma/client';
import { LessonRepository } from './lesson.repository.interface';
import { Lesson } from './domain/lesson';

export class LessonDatabase implements LessonRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getLessons(): Promise<Lesson[]> {
    const dbLessons = await this.prismaService.lesson.findMany();
    return dbLessons.map((dbLesson) => this.mapDbLessonToObjectModel(dbLesson));
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    const dbLesson = await this.prismaService.lesson.findUnique({
      where: {
        id,
      },
    });
    if (!dbLesson) {
      return null;
    }
    return this.mapDbLessonToObjectModel(dbLesson);
  }

  mapDbLessonToObjectModel(dbLesson: DbLesson): Lesson {
    return new Lesson({
      id: dbLesson.id,
      title: dbLesson.title,
      description: dbLesson.description,
      video: dbLesson.video,
    });
  }
}
