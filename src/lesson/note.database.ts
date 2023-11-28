import { PrismaService } from 'src/utils/prisma/prisma.service';
import { NoteRepository } from './note.repository.interface';
import { Note } from './domain/note';
import { Note as DbNote } from '.prisma/client';

export class NoteDatabase implements NoteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createNote(note: Note): Promise<Note> {
    const dbNote = await this.prismaService.note.create({
      data: {
        id: note.id,
        time: note.time,
        note: note.note,
        lesson: {
          connect: { id: note.lessonId },
        },
        user: {
          connect: { id: note.userId },
        },
      },
    });
    return this.mapDbUserToObjectModel(dbNote);
  }

  mapDbUserToObjectModel(dbNote: DbNote): Note {
    return new Note({
      id: dbNote.id,
      time: dbNote.time,
      note: dbNote.note,
      lessonId: dbNote.lessonId,
      userId: dbNote.userId,
    });
  }
}
