import { Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';
import { QuizViewModel } from './views/quiz.model';
import { QuizRepository } from './quiz.repository.interface';
import { CreateQuizAnswerArgs } from './dto/createQuizAnswer.dto';
import { Answer } from './domain/answer';
import { ScoreViewModel } from './views/score.model';
import { LessonApplicationService } from '../lesson/lesson.service';

@Injectable()
export class QuizApplicationService {
  private readonly logger = new Logger(QuizApplicationService.name);
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly lessonService: LessonApplicationService,
  ) {}

  async getQuizQuestions(lessonId: string): Promise<QuizViewModel[]> {
    return await this.quizRepository.getQuizes(lessonId);
  }

  async submitAnswers(
    args: CreateQuizAnswerArgs,
    userId: string,
    lessonId: string,
  ): Promise<ScoreViewModel> {
    await this.lessonService.throwIfLessonIdIsInvalid(lessonId);
    await this.quizRepository.deleteQuizAnswers(lessonId, userId);

    await this.quizRepository.createQuizAnswer(
      lessonId,
      userId,
      args.answers.map(
        (answer) =>
          new Answer({
            id: v4(),
            answer: answer.answer,
            quizId: answer.quizId,
          }),
      ),
    );

    return this.getScore(userId, lessonId);
  }

  async getScore(userId: string, lessonId: string): Promise<ScoreViewModel> {
    const total = await this.quizRepository.getQuizesCount(lessonId);
    const score = await this.quizRepository.getCorrectAnswerCount(
      lessonId,
      userId,
    );

    return new ScoreViewModel({ score, total });
  }
}
