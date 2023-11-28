import { Answer } from './domain/answer';
import { Quiz } from './domain/quiz';

export abstract class QuizRepository {
  abstract getQuizes(lessonId: string): Promise<Quiz[]>;
  abstract deleteQuizAnswers(lessonId: string, userId: string): Promise<void>;
  abstract createQuizAnswer(
    lessonId: string,
    userId: string,
    answers: Answer[],
  ): Promise<void>;
  abstract getQuizesCount(lessonId: string): Promise<number>;
  abstract getCorrectAnswerCount(
    lessonId: string,
    userId: string,
  ): Promise<number>;
}
