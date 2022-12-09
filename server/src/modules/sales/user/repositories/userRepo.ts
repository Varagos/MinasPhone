import { User } from '../domain/user.js';

export interface IUserRepo {
  save(user: User): Promise<void>;
}
