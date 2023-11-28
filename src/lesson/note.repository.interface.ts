import { Note } from './domain/note';

export abstract class NoteRepository {
  abstract createNote(user: Note): Promise<Note>;
}
