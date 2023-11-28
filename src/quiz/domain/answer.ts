export class Answer {
  readonly id: string;
  readonly quizId: string;
  readonly answer: string;

  constructor({
    id,
    quizId,
    answer,
  }: {
    quizId: string;
    id: string;
    answer: string;
  }) {
    this.quizId = quizId;
    this.id = id;
    this.answer = answer;
  }
}
