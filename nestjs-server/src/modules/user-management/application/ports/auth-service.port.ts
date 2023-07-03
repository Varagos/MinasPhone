import { Option } from 'oxide.ts';
import { UserEntity } from '@modules/user-management/domain/user.entity';
export type UserInfo = {
  id: string;
  email: string;
  timeJoined: number;
  roles?: string[];
};
export interface IAuthService {
  getUsers(): Promise<UserInfo[]>;
  getUserById(userId: string): Promise<Option<UserInfo>>;
  ensureAdmin(): any;
  ensureAuthenticated(): any;
  getUserForEmail(email: string): Promise<UserEntity | null>;
  deleteUserForId(userId: string): Promise<void>;
  getUserInfoWithRoles(userId: string): Promise<any>;
}
