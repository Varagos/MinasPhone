import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SuperTokensAuthModule } from './infra/services/super-tokens/super-tokens.module';
import { authConfig } from '@config/auth.config';
import { AUTH_SERVICE_TOKEN, ROLES_SERVICE_TOKEN } from './constants';
import { SuperTokensAuthService } from './infra/services/super-tokens/services/auth.service';
import {
  USER_REGISTER_EVENT_NAME,
  UserRegisteredListener,
} from './application/events/listeners/user-registered.listener';
import { SupertokensUserRolesService } from './infra/services/super-tokens/services/roles.service';
import { FindUsersQueryHandler } from './application/queries/find-users/find-users.handler';
import { FindUserByIdQueryHandler } from './application/queries/find-user-by-id/find-user-by-id.handler';

// Stuff not registered as providers in super-tokens, because they are initialized on each controller.
export {
  AuthGuard,
  RolesGuard,
  Session,
} from './infra/services/super-tokens/super-tokens.module';

const queryHandlers: Provider[] = [
  FindUsersQueryHandler,
  FindUserByIdQueryHandler,
];

@Module({
  imports: [
    CqrsModule,
    SuperTokensAuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: authConfig.superTokens.connectionURI,
      apiKey: authConfig.superTokens.apiKey,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: 'MinasPhone',
        apiDomain: 'http://localhost:8080',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
      userRegisteredEventName: USER_REGISTER_EVENT_NAME,
    }),
  ],
  providers: [
    UserRegisteredListener,
    ...queryHandlers,
    { provide: AUTH_SERVICE_TOKEN, useClass: SuperTokensAuthService },
    { provide: ROLES_SERVICE_TOKEN, useClass: SupertokensUserRolesService },
  ],
  exports: [SuperTokensAuthModule],
})
export class UserManagementModule {}
