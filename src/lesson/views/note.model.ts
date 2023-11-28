export class NoteViewModel {
  id: string;
  note: string;
  time: string;

  constructor({ id, note, time }: { id: string; note: string; time: string }) {
    this.id = id;
    this.note = note;
    this.time = time;
  }
}
