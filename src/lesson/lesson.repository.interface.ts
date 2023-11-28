import { Lesson } from './domain/lesson';

export abstract class LessonRepository {
  abstract getLessons(): Promise<Lesson[]>;
  abstract getLessonById(lessonId: string): Promise<Lesson>;
}
