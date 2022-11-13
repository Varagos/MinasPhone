import { UserMap } from '../../mappers/UserMap';
import { User } from '../../domain/user';
import { IUserRepo } from '../userRepo';

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
