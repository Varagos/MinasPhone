import { deleteUser, getUsersNewestFirst } from 'supertokens-node';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import UserRoles from 'supertokens-node/recipe/userroles';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import { SupertokensUserRolesService } from './roles.service';
import {
  IAuthService,
  UserInfo,
} from '@modules/user-management/application/ports/auth-service.port';
import { UserEmail } from '@modules/user-management/domain/value-objects/userEmail';
import { UserEntity } from '@modules/user-management/domain/user.entity';
import { Injectable } from '@nestjs/common';
import { Roles } from '@modules/user-management/application/ports/role-service.port';
import { None, Option, Some } from 'oxide.ts';

type SuperTokensUsersResponse = Array<{
  user: {
    email: string;
    id: string;
    timeJoined: number;
  };
  recipeId: string;
}>;
// [
//   {
//     user: {
//       email: "mark.girgis13@gmail.com",
//       id: "81c82b27-3b28-48ea-bcf4-83868276734d",
//       timeJoined: 1653107541084,
//     },
//     recipeId: "emailpassword",
//   },
//   {
//     user: {
//       email: "markos.girgis13@gmail.com",
//       id: "a611ab79-9913-4db1-95fc-62ecf8d41938",
//       timeJoined: 1651921685405,
//     },
//     recipeId: "emailpassword",
//   },
// ]

@Injectable()
export class SuperTokensAuthService implements IAuthService {
  constructor(private readonly rolesService: SupertokensUserRolesService) {}
  async getUserById(userId: string): Promise<Option<UserInfo>> {
    const userInfo = await EmailPassword.getUserById(userId);
    if (userInfo === undefined) {
      return None;
    }
    const roles = await this.rolesService.getRolesForUser(userId);
    return Some({ ...userInfo, roles });
  }
  async getUsers() {
    // get the latest 100 users
    const usersResponse = await getUsersNewestFirst({
      tenantId: 'public',
    });

    const users: SuperTokensUsersResponse = usersResponse.users;
    return users.map(({ user }) => user);
  }

  ensureAdmin() {
    return verifySession({
      overrideGlobalClaimValidators: async (globalValidators) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes(Roles.Admin),
        // UserRoles.PermissionClaim.validators.includes("edit")
      ],
    });
  }

  ensureAuthenticated() {
    return verifySession();
  }

  async deleteUserForId(userId: string): Promise<void> {
    await deleteUser(userId); // this will succeed even if the userId didn't exist.
  }
  async getUserForEmail(email: string): Promise<UserEntity | null> {
    const usersInfo = await EmailPassword.getUserByEmail('public', email);
    if (usersInfo === undefined) return null;
    const entity = new UserEntity({
      id: usersInfo.id,
      props: {
        email: new UserEmail({ value: usersInfo.email }),
      } as any, // TODO: fix this
    });
    return entity;
  }

  async getUserInfoWithRoles(userId: string): Promise<any> {
    const userRoles = await this.rolesService.getRolesForUser(userId);
    const userInfo = await EmailPassword.getUserById(userId);
    return { ...userInfo, roles: userRoles };
  }
}
