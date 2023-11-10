import { Injectable } from '@nestjs/common';

import { VerifySessionOptions } from 'supertokens-node/recipe/session';
import { AuthGuard } from './auth.guard';
import { SessionClaimValidator } from 'supertokens-node/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { Roles } from '@modules/user-management/application/ports/role-service.port';

/**
 * @example
 * 
@Controller()
export class ExampleController {
  @Post('example')
  @UseGuards(new RolesGuard())
  async postExample(@Session() session: SessionContainer): Promise<boolean> {
    // All validator checks have passed and the user is an admin.
    return true;
  }
}
 */
/**
 * Needs admin role to pass.
 */
@Injectable()
export class RolesGuard extends AuthGuard {
  constructor(verifyOptions: VerifySessionOptions = {}) {
    super({
      ...verifyOptions,
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes(Roles.Admin),
        // UserRoles.PermissionClaim.validators.includes("edit")
      ],
    });
  }
}
