import { PrismaService } from 'src/utils/prisma/prisma.service';
import { User as DbUser } from '.prisma/client';
import { UserRepository } from './user.repository.interface';
import { User } from './domain/user';

export class UserDatabase implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(user: User): Promise<User> {
    const dbUser = await this.prismaService.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
    return this.mapDbUserToObjectModel(dbUser);
  }

  async getUserById(id: string): Promise<User | null> {
    const dbUser = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!dbUser) {
      return null;
    }
    return this.mapDbUserToObjectModel(dbUser);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const dbUser = await this.prismaService.user.findFirst({
      where: {
        email: { equals: email, mode: 'insensitive' },
      },
    });
    if (!dbUser) {
      return null;
    }
    return this.mapDbUserToObjectModel(dbUser);
  }

  mapDbUserToObjectModel(dbUser: DbUser): User {
    return new User({
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
    });
  }
}
