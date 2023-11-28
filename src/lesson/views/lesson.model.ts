export class LessonViewModel {
  id: string;
  title: string;
  description: string;

  constructor({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description: string;
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
