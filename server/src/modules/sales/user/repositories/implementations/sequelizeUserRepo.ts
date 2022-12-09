import { UserMap } from '../../mappers/UserMap.js';
import { User } from '../../domain/user.js';
import { IUserRepo } from '../userRepo.js';

export class UserRepo implements IUserRepo {
  private models: Record<string, any>;

  constructor(models: Record<string, any>) {
    this.models = models;
  }

  async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const rawSequelizeUser = UserMap.toPersistence(user);

    await UserModel.create(rawSequelizeUser);
  }
}
