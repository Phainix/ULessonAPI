import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import { QuizApplicationService } from './quiz.service';
import { Quiz } from './domain/quiz';
import { QuizRepository } from './quiz.repository.interface';
import { LessonApplicationService } from '../lesson/lesson.service';

describe('Quiz Application Service', () => {
  const expectedQuizViewModel = {
    id: expect.any(String),
    question: expect.any(String),
    optionA: expect.any(String),
    optionB: expect.any(String),
    optionC: expect.any(String),
    optionD: expect.any(String),
  };

  const expectedScoreViewModel = {
    score: expect.any(Number),
    total: expect.any(Number),
  };

  let service: QuizApplicationService;

  const mockQuiz = new Quiz({
    id: v4(),
    question: 'Which noun below is a collective noun',
    optionA: 'Woman',
    optionB: 'Duck',
    optionC: 'Family',
    optionD: 'Children',
  });

  const MockQuizRepository = {
    getQuizes: jest.fn((): Quiz[] => [mockQuiz]),
    deleteQuizAnswers: jest.fn(),
    createQuizAnswer: jest.fn(),
    getQuizesCount: jest.fn((): number => 5),
    getCorrectAnswerCount: jest.fn((): number => 5),
  };

  const MockLessonService = {
    throwIfLessonIdIsInvalid: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        QuizApplicationService,
        {
          provide: QuizRepository,
          useValue: MockQuizRepository,
        },
        {
          provide: LessonApplicationService,
          useValue: MockLessonService,
        },
      ],
    }).compile();

    service = app.get<QuizApplicationService>(QuizApplicationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when getting quizes', () => {
    it('should return the existing quizes', async () => {
      const result = await service.getQuizQuestions('lesson-id');
      expect(result).toMatchObject([expectedQuizViewModel]);

      expect(MockQuizRepository.getQuizes).toHaveBeenCalled();
    });
  });

  describe('when submitting answer', () => {
    it('should create answer and return the score', async () => {
      const result = await service.submitAnswers(
        { answers: [{ quizId: v4(), answer: 'C' }] },
        'lesson',
        'user-id',
      );
      expect(result).toMatchObject(expectedScoreViewModel);

      expect(MockQuizRepository.createQuizAnswer).toHaveBeenCalled();
      expect(MockQuizRepository.getQuizesCount).toHaveBeenCalled();
      expect(MockQuizRepository.getCorrectAnswerCount).toHaveBeenCalled();
      expect(MockLessonService.throwIfLessonIdIsInvalid).toHaveBeenCalled();
    });
  });
});
