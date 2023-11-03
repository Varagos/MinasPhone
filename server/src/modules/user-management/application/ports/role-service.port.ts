export enum Roles {
  Customer = 'customer',
  Admin = 'admin',
}
// TODO create permissions enum

export interface IRoleService {
  createRole(role: Roles, permissions: string[]): Promise<void>;
  deleteRole(role: Roles): Promise<void>;
  assignRole(userId: string, role: Roles): Promise<void>;
  getRolesForUser(userId: string): Promise<string[]>;
  getUsersThatHaveRole(role: Roles): Promise<string[]>;
  getAllRoles(): Promise<string[]>;

  addPermissionForRole(role: Roles, permission: string): Promise<void>;
  removePermissionForRole(role: Roles, permission: string): Promise<void>;
  getPermissionsForRole(role: Roles): Promise<string[]>;

  getRolesWithPermission(permission: string): Promise<string[]>;
}
