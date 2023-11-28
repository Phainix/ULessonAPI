import { IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateQuizAnswerArgs {
  @IsNotEmpty({ message: 'Answers must be specified' })
  @ValidateNested({ each: true })
  answers: QuizAnswer[];
}

class QuizAnswer {
  @IsNotEmpty({ message: 'Lesson ID must be specified' })
  quizId: string;

  @IsNotEmpty({ message: 'Answer must be specified' })
  answer: string;
}
