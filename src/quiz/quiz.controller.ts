import { Controller, HttpCode, Get, Post, Body, Param } from '@nestjs/common';
import { QuizViewModel } from './views/quiz.model';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateQuizAnswerArgs } from './dto/createQuizAnswer.dto';
import { GetUser } from 'src/utils/decorators/user.decorator';
import { ScoreViewModel } from './views/score.model';
import { QuizApplicationService } from './quiz.service';

@Controller('quiz')
@ApiBearerAuth()
export class QuizController {
  constructor(private readonly quizService: QuizApplicationService) {}

  @Get(':lessonId')
  @HttpCode(200)
  getQuizQuestions(
    @Param('lessonId') lessonId: string,
  ): Promise<QuizViewModel[]> {
    return this.quizService.getQuizQuestions(lessonId);
  }

  @Post(':lessonId/answer')
  @HttpCode(201)
  submitAnswers(
    @Body() payload: CreateQuizAnswerArgs,
    @GetUser('id') userId: string,
    @Param('lessonId') lessonId: string,
  ): Promise<ScoreViewModel> {
    return this.quizService.submitAnswers(payload, userId, lessonId);
  }
}
