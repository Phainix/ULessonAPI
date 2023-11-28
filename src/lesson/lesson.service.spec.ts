import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import { LessonApplicationService } from './lesson.service';
import { Lesson } from './domain/lesson';
import { LessonRepository } from './lesson.repository.interface';
import { NoteRepository } from './note.repository.interface';
import { Note } from './domain/note';
import { NotFoundException } from '@nestjs/common';

describe('Lesson Application Service', () => {
  const expectedLessonViewModel = {
    id: expect.any(String),
    title: expect.any(String),
    description: expect.any(String),
  };

  const expectedNoteViewModel = {
    id: expect.any(String),
    note: expect.any(String),
    time: expect.any(String),
  };

  let service: LessonApplicationService;

  const mockLesson = new Lesson({
    id: v4(),
    title: 'Shapes',
    description: 'A lesson about shapes',
    video: '',
  });

  const mockNote = new Note({
    id: v4(),
    note: 'Some notes',
    time: '05:55',
    lessonId: v4(),
    userId: v4(),
  });

  const MockLessonRepository = {
    getLessons: jest.fn((): Lesson[] => [mockLesson]),
    getLessonById: jest.fn((): Lesson | null => mockLesson),
  };

  const MockNoteRepository = {
    createNote: jest.fn((): Note => mockNote),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        LessonApplicationService,
        {
          provide: LessonRepository,
          useValue: MockLessonRepository,
        },
        {
          provide: NoteRepository,
          useValue: MockNoteRepository,
        },
      ],
    }).compile();

    service = app.get<LessonApplicationService>(LessonApplicationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when getting lessons', () => {
    it('should return the existing lessons', async () => {
      const result = await service.getLessons();
      expect(result).toMatchObject([expectedLessonViewModel]);

      expect(MockLessonRepository.getLessons).toHaveBeenCalled();
    });
  });

  describe('when getting creating a note', () => {
    it('should throw if lessonId doesnt exist', async () => {
      MockLessonRepository.getLessonById.mockReturnValueOnce(null);

      await expect(
        service.createNote(
          { lessonId: v4(), note: 'Some notes', time: '09:32' },
          'user-id',
        ),
      ).rejects.toThrow(NotFoundException);
      expect(MockLessonRepository.getLessonById).toHaveBeenCalled();
    });

    it('should create the note and return it when successfull', async () => {
      MockLessonRepository.getLessonById.mockReturnValueOnce(mockLesson);

      const result = await service.createNote(
        { lessonId: v4(), note: 'Some notes', time: '09:32' },
        'user-id',
      );
      expect(result).toMatchObject(expectedNoteViewModel);

      expect(MockNoteRepository.createNote).toHaveBeenCalled();
    });
  });
});
