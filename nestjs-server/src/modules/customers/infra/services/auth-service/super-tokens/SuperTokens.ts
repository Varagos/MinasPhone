import { deleteUser, getUsersNewestFirst } from 'supertokens-node';
import { verifySession } from 'supertokens-node/recipe/session/framework/express/index';
import UserRoles from 'supertokens-node/recipe/userroles/index';
import EmailPassword from 'supertokens-node/recipe/emailpassword/index';

import { Roles, UserRolesService } from '../../super-tokens/roles/index';
import { IAuthService } from '@modules/customers/application/ports/auth-service.port';
import { UserEmail } from '@modules/customers/domain/value-objects/userEmail';
import { UserEntity } from '@modules/customers/domain/user.entity';

export class SuperTokensAuthService implements IAuthService {
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
  async getUserForEmail(email: string): Promise<UserEntity | null> {
    const usersInfo = await EmailPassword.getUserByEmail(email);
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
    const userRoles = await UserRolesService.getRolesForUser(userId);
    const userInfo = await EmailPassword.getUserById(userId);
    return { ...userInfo, roles: userRoles };
  }
}
