import { Injectable, OnModuleInit } from '@nestjs/common';
import { SupertokensUserRolesService } from './roles.service';
import { Roles } from '@modules/user-management/application/ports/role-service.port';

@Injectable()
export class RolesInitializerService implements OnModuleInit {
  constructor(private readonly rolesService: SupertokensUserRolesService) {}

  async onModuleInit(): Promise<void> {
    // You could add a check here to only create the roles if they don't already exist.
    console.log('Existing roles...');
    const currentRoles = await this.rolesService.getAllRoles();
    // console.log('Creating roles...');
    const nonExistingRoles: Roles[] = Object.values(Roles).filter(
      (role) => !currentRoles.includes(role),
    );
    for (const role of nonExistingRoles) {
      console.log(`Creating role ${role}...`);
      await this.rolesService.createRole(role, []);
    }
    // await this.rolesService.createRole(Roles.Customer, []);
    // await this.rolesService.createRole(Roles.Admin, []);
  }
}
