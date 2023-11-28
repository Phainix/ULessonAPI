import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import { UserApplicationService } from './user.service';
import { User } from './domain/user';
import { UserRepository } from './user.repository.interface';
import { ConfigService } from '@nestjs/config';

describe('User Application Service', () => {
  const expectedUserViewModel = {
    id: expect.any(String),
    idToken: expect.any(String),
    email: expect.any(String),
  };

  let service: UserApplicationService;

  const mockUser = new User({
    id: v4(),
    name: 'Student User',
    email: 'student@ulesson.com',
  });

  const MockUserRepository = {
    createUser: jest.fn((): User => mockUser),
    getUserByEmail: jest.fn((): User | null => mockUser),
  };

  const MockConfigService = {
    get: jest.fn((): string => v4()),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserApplicationService,
        {
          provide: UserRepository,
          useValue: MockUserRepository,
        },
        {
          provide: ConfigService,
          useValue: MockConfigService,
        },
      ],
    }).compile();

    service = app.get<UserApplicationService>(UserApplicationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when getting user token', () => {
    it('should return the token and create user if it doesnt exist', async () => {
      MockUserRepository.getUserByEmail.mockReturnValueOnce(null);

      const result = await service.getUserToken({ email: 'email@email.co' });
      expect(result).toMatchObject(expectedUserViewModel);

      expect(MockUserRepository.getUserByEmail).toHaveBeenCalled();
      expect(MockUserRepository.createUser).toHaveBeenCalled();
    });

    it('should return the token when user exists', async () => {
      MockUserRepository.getUserByEmail.mockReturnValueOnce(mockUser);

      const result = await service.getUserToken({ email: 'email@email.co' });
      expect(result).toMatchObject(expectedUserViewModel);

      expect(MockUserRepository.getUserByEmail).toHaveBeenCalled();
      expect(MockUserRepository.createUser).not.toHaveBeenCalled();
    });
  });
});
