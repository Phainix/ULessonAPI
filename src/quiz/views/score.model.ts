export class ScoreViewModel {
  score: number;
  total: number;

  constructor({ score, total }: { score: number; total: number }) {
    this.score = score;
    this.total = total;
  }
}
