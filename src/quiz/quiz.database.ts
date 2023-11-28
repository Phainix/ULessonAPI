import { PrismaService } from 'src/utils/prisma/prisma.service';
import { Quiz as DbQuiz } from '.prisma/client';
import { Quiz } from './domain/quiz';
import { QuizRepository } from './quiz.repository.interface';
import { Answer } from './domain/answer';

export class QuizDatabase implements QuizRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async getQuizes(lessonId: string): Promise<Quiz[]> {
    const dbQuizes = await this.prismaService.quiz.findMany({
      where: {
        lessonId,
      },
    });
    return dbQuizes.map((dbQuiz) => this.mapDbQuizToObjectModel(dbQuiz));
  }

  async deleteQuizAnswers(lessonId: string, userId: string): Promise<void> {
    await this.prismaService.userQuiz.deleteMany({
      where: {
        lessonId,
        userId,
      },
    });
  }

  async createQuizAnswer(
    lessonId: string,
    userId: string,
    answers: Answer[],
  ): Promise<void> {
    await this.prismaService.userQuiz.createMany({
      data: answers.map(({ id, answer, quizId }) => ({
        id,
        answer,
        quizId,
        lessonId,
        userId,
      })),
    });
  }

  async getQuizesCount(lessonId: string): Promise<number> {
    const dbQuizes = await this.prismaService.quiz.aggregate({
      where: {
        lessonId,
      },
      _count: {
        id: true,
      },
    });
    return dbQuizes._count.id;
  }

  async getCorrectAnswerCount(
    lessonId: string,
    userId: string,
  ): Promise<number> {
    const dbAnswers = await this.prismaService.userQuiz.aggregate({
      where: {
        lessonId,
        userId,
        AND: {
          OR: ['A', 'B', 'C', 'D'].map((answer) => ({
            answer,
            quiz: { answer },
          })),
        },
      },
      _count: {
        id: true,
      },
    });
    return dbAnswers._count.id;
  }

  mapDbQuizToObjectModel(dbQuiz: DbQuiz): Quiz {
    return new Quiz({
      id: dbQuiz.id,
      question: dbQuiz.question,
      optionA: dbQuiz.optionA,
      optionB: dbQuiz.optionB,
      optionC: dbQuiz.optionC,
      optionD: dbQuiz.optionD,
    });
  }
}
