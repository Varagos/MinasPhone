import { User } from '../domain/user';

export interface IUserRepo {
  save(user: User): Promise<void>;
}
