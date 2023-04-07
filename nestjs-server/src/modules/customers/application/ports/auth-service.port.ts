import { UserEntity } from '@modules/customers/domain/user.entity';

export interface IAuthService {
  getUsers(): any;
  ensureAdmin(): any;
  ensureAuthenticated(): any;
  getUserForEmail(email: string): Promise<UserEntity | null>;
  deleteUserForId(userId: string): Promise<void>;
  getUserInfoWithRoles(userId: string): Promise<any>;
}
