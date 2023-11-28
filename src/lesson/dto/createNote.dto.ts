import { IsNotEmpty, Matches } from 'class-validator';

export class CreateNoteArgs {
  @IsNotEmpty({ message: 'Lesson ID must be specified' })
  lessonId: string;

  @IsNotEmpty({ message: 'Note must be specified' })
  note: string;

  @IsNotEmpty({ message: 'Time must be specified' })
  @Matches(/^([0-9]+:)?[0-5][0-9]:[0-5][0-9]$/)
  time: string;
}
