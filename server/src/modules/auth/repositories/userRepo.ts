import { User } from '../domain/user';

export interface IAuthService {
  //   exists(userEmail: UserEmail): Promise<boolean>;
  //   getUserByUserId(userId: string): Promise<User>;
  //   getUserByUserName(userName: UserName | string): Promise<User>;
  getUsers(): void;
}

export interface IUserRepo {
  save(user: User): Promise<void>;
}
