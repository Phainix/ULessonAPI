export class Quiz {
  readonly id: string;
  readonly question: string;
  readonly optionA: string;
  readonly optionB: string;
  readonly optionC: string;
  readonly optionD: string;

  constructor({
    id,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
  }: {
    question: string;
    id: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  }) {
    this.question = question;
    this.id = id;
    this.optionA = optionA;
    this.optionB = optionB;
    this.optionC = optionC;
    this.optionD = optionD;
  }
}
