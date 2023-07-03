import UserRoles, {
  UserRoleClaim,
  PermissionClaim,
} from 'supertokens-node/recipe/userroles';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Injectable } from '@nestjs/common';
import {
  IRoleService,
  Roles,
} from '@modules/user-management/application/ports/role-service.port';

@Injectable()
export class SupertokensUserRolesService implements IRoleService {
  /**
   *
   * @param role e.g. "user", "admin"
   * @param permissions  e.g ["read", "write"]
   */
  async createRole(role: Roles, permissions: string[]) {
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

  async assignRole(userId: string, role: Roles) {
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
  async addRolesAndPermissionsToSession(session: SessionContainer) {
    // we add the user's roles to the user's session
    await session.fetchAndSetClaim(UserRoleClaim);

    // we add the permissions of a user to the user's session
    await session.fetchAndSetClaim(PermissionClaim);
  }

  async removeRoleFromUserAndTheirSession(
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

  async getRolesForUser(userId: string) {
    const response = await UserRoles.getRolesForUser(userId);
    const roles: string[] = response.roles;
    return roles;
  }

  async getUsersThatHaveRole(role: Roles) {
    const response = await UserRoles.getUsersThatHaveRole(role);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
      throw new Error('No such role exists');
    }

    const users: string[] = response.users;
    return users;
  }

  async addPermissionForRole(role: Roles, permission: string) {
    // Add the "write" permission to the "user" role
    await UserRoles.createNewRoleOrAddPermissions(role, [permission]);
  }

  async removePermissionForRole(role: Roles, permission: string) {
    // Remove the "write" permission from the "user" role
    const response = await UserRoles.removePermissionsFromRole(role, [
      permission,
    ]);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
    }
  }
  async getPermissionsForRole(role: Roles) {
    const response = await UserRoles.getPermissionsForRole(role);

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      // No such role exists
      throw new Error('No such role exists');
    }

    const permissions: string[] = response.permissions;
    return permissions;
  }

  async getRolesWithPermission(permission: string) {
    const response = await UserRoles.getRolesThatHavePermission(permission);
    const roles: string[] = response.roles;
    return roles;
  }

  async getAllRoles(): Promise<string[]> {
    const roles: string[] = (await UserRoles.getAllRoles()).roles;
    return roles;
  }

  async deleteRole(role: Roles) {
    // Delete the user role
    const response = await UserRoles.deleteRole(role);

    if (!response.didRoleExist) {
      // There was no such role
    }
  }
}
