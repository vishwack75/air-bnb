import { User, UserDocument } from '../models/User';

export class UserRepository {
  async findByEmail(email: string, includePassword = false): Promise<UserDocument | null> {
    const query = User.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      query.select('+passwordHash');
    }
    return query.exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return User.findById(id).exec();
  }

  async create(userData: {
    name: string;
    email: string;
    passwordHash: string;
    avatar?: string;
  }): Promise<UserDocument> {
    return User.create(userData);
  }
}

export const userRepository = new UserRepository();
