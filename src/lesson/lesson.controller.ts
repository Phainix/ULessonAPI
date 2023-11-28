import { Controller, HttpCode, Get, Post, Body } from '@nestjs/common';
import { LessonViewModel } from './views/lesson.model';
import { LessonApplicationService } from './lesson.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateNoteArgs } from './dto/createNote.dto';
import { NoteViewModel } from './views/note.model';
import { GetUser } from 'src/utils/decorators/user.decorator';

@Controller('lesson')
@ApiBearerAuth()
export class LessonController {
  constructor(private readonly lessonService: LessonApplicationService) {}

  @Get('')
  @HttpCode(200)
  getLessons(): Promise<LessonViewModel[]> {
    return this.lessonService.getLessons();
  }

  @Post('note')
  @HttpCode(201)
  createNote(
    @Body() payload: CreateNoteArgs,
    @GetUser('id') userId: string,
  ): Promise<NoteViewModel> {
    return this.lessonService.createNote(payload, userId);
  }
}
