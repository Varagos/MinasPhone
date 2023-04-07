import UserRoles, {
  UserRoleClaim,
  PermissionClaim,
} from 'supertokens-node/recipe/userroles/index.js';
import { SessionContainer } from 'supertokens-node/recipe/session/index';

export enum Roles {
  Customer = 'customer',
  Admin = 'admin',
}

export class UserRolesService {
  /**
   *
   * @param role e.g. "user", "admin"
   * @param permissions  e.g ["read", "write"]
   */
  static async createRole(role: Roles, permissions: string[]) {
    /**
     * You can choose to give multiple or no permissions when creating a role
     * createNewRoleOrAddPermissions("user", []) - No permissions
     * createNewRoleOrAddPermissions("user", ["read", "write"]) - Multiple permissions
     */
    const response = await UserRoles.createNewRoleOrAddPermissions(
      role,
      permissions,
    );

    if (response.createdNewRole === false) {
      // The role already exists
    }
  }

  static async addRoleToUser(userId: string, role: Roles) {
    const response = await UserRoles.addRoleToUser(userId, role);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
      throw new Error('No such role exists');
    }

    if (response.didUserAlreadyHaveRole === true) {
      // The user already had the role
      console.error('The user already had the role');
    }
  }

  /**
   *
   * @param session The session variable in the code snippet above
   * refers to the session object that's the result of calling
   *  the verifySession or getSession function.
   */
  static async addRolesAndPermissionsToSession(session: SessionContainer) {
    // we add the user's roles to the user's session
    await session.fetchAndSetClaim(UserRoleClaim);

    // we add the permissions of a user to the user's session
    await session.fetchAndSetClaim(PermissionClaim);
  }

  static async removeRoleFromUserAndTheirSession(
    session: SessionContainer,
    role: Roles,
  ) {
    const response = await UserRoles.removeUserRole(session.getUserId(), role);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
      return;
    }

    if (response.didUserHaveRole === false) {
      // The user was never assigned the role
    } else {
      // We also want to update the session of this user to reflect this change.
      await session.fetchAndSetClaim(UserRoles.UserRoleClaim);
      await session.fetchAndSetClaim(UserRoles.PermissionClaim);
    }
  }

  static async getRolesForUser(userId: string) {
    const response = await UserRoles.getRolesForUser(userId);
    const roles: string[] = response.roles;
    return roles;
  }

  static async getUsersThatHaveRole(role: Roles) {
    const response = await UserRoles.getUsersThatHaveRole(role);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
      return;
    }

    const users: string[] = response.users;
    return users;
  }

  static async addPermissionForRole(role: Roles, permission: string) {
    // Add the "write" permission to the "user" role
    await UserRoles.createNewRoleOrAddPermissions(role, [permission]);
  }

  static async removePermissionForRole(role: Roles, permission: string) {
    // Remove the "write" permission from the "user" role
    const response = await UserRoles.removePermissionsFromRole(role, [
      permission,
    ]);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
    }
  }
  static async getPermissionsForRole(role: Roles) {
    const response = await UserRoles.getPermissionsForRole(role);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
      return;
    }

    const permissions: string[] = response.permissions;
    return permissions;
  }

  static async getRolesWithPermission(permission: string) {
    const response = await UserRoles.getRolesThatHavePermission(permission);
    const roles: string[] = response.roles;
    return roles;
  }

  static async getAllRoles() {
    const roles: string[] = (await UserRoles.getAllRoles()).roles;
    return roles;
  }

  static async deleteRole(role: Roles) {
    // Delete the user role
    const response = await UserRoles.deleteRole(role);

    if (!response.didRoleExist) {
      // There was no such role
    }
  }
}
