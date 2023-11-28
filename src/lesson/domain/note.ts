export class Note {
  readonly id: string;
  readonly note: string;
  readonly time: string;
  readonly lessonId: string;
  readonly userId: string;

  constructor({
    id,
    note,
    time,
    lessonId,
    userId,
  }: {
    note: string;
    id: string;
    time: string;
    lessonId: string;
    userId: string;
  }) {
    this.note = note;
    this.id = id;
    this.time = time;
    this.lessonId = lessonId;
    this.userId = userId;
  }
}
