import { User } from './domain/user';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User | null>;
}
