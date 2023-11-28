export class QuizViewModel {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  constructor({
    id,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
  }: {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  }) {
    this.id = id;
    this.question = question;
    this.optionA = optionA;
    this.optionB = optionB;
    this.optionC = optionC;
    this.optionD = optionD;
  }
}
