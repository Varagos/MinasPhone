import { deleteUser, getUsersNewestFirst } from 'supertokens-node';
import { IAuthService } from '../authProvider.js';
import { verifySession } from 'supertokens-node/recipe/session/framework/express/index.js';
import UserRoles from 'supertokens-node/recipe/userroles/index.js';
import EmailPassword from 'supertokens-node/recipe/emailpassword/index.js';

import { Roles, UserRolesService } from './roles/index.js';
import { User } from '../../domain/user.js';
import { UserEmail } from '../../domain/userEmail.js';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';

export class SuperTokens implements IAuthService {
  async getUsers() {
    // get the latest 100 users
    let usersResponse = await getUsersNewestFirst();

    let users = usersResponse.users;
    return users;
    let nextPaginationToken = usersResponse.nextPaginationToken;

    // get the next 200 users
    usersResponse = await getUsersNewestFirst({
      limit: 200,
      paginationToken: nextPaginationToken,
    });

    users = usersResponse.users;
    nextPaginationToken = usersResponse.nextPaginationToken;

    // get for specific recipes
    usersResponse = await getUsersNewestFirst({
      limit: 200,
      paginationToken: nextPaginationToken,
      // only get for those users who signed up with EmailPassword
      includeRecipeIds: ['emailpassword'],
    });

    users = usersResponse.users;
    nextPaginationToken = usersResponse.nextPaginationToken;
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
  async getUserForEmail(email: string): Promise<User | null> {
    const usersInfo = await EmailPassword.getUserByEmail(email);
    if (usersInfo === undefined) return null;
    const user = User.create(
      {
        email: UserEmail.create(usersInfo.email).getValue(),
        joinedAt: usersInfo.timeJoined,
      },
      new UniqueEntityID(usersInfo.id),
    );
    return user.getValue();
  }

  async getUserInfoWithRoles(userId: string): Promise<any> {
    const userRoles = await UserRolesService.getRolesForUser(userId);
    const userInfo = await EmailPassword.getUserById(userId);
    return { ...userInfo, roles: userRoles };
  }
}
