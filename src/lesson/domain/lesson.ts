export class Lesson {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly video: string;

  constructor({
    id,
    title,
    description,
    video,
  }: {
    title: string;
    id: string;
    description: string;
    video: string;
  }) {
    this.title = title;
    this.id = id;
    this.description = description;
    this.video = video;
  }
}
