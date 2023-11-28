import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LessonRepository } from './lesson.repository.interface';
import { LessonViewModel } from './views/lesson.model';
import { CreateNoteArgs } from './dto/createNote.dto';
import { Lesson } from './domain/lesson';
import { NoteRepository } from './note.repository.interface';
import { Note } from './domain/note';
import { v4 } from 'uuid';
import { NoteViewModel } from './views/note.model';

@Injectable()
export class LessonApplicationService {
  private readonly logger = new Logger(LessonApplicationService.name);
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly noteRepository: NoteRepository,
  ) {}

  async getLessons(): Promise<LessonViewModel[]> {
    return await this.lessonRepository.getLessons();
  }

  async createNote(
    args: CreateNoteArgs,
    userId: string,
  ): Promise<NoteViewModel> {
    await this.throwIfLessonIdIsInvalid(args.lessonId);

    const note = await this.noteRepository.createNote(
      new Note({
        id: v4(),
        note: args.note,
        time: args.time,
        lessonId: args.lessonId,
        userId,
      }),
    );

    return new NoteViewModel(note);
  }

  async throwIfLessonIdIsInvalid(lessonId: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.getLessonById(lessonId);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }
}
