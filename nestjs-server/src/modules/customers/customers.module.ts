import { Module } from '@nestjs/common';
import { CustomersController } from './infra/controllers/customers.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { SuperTokensAuthModule } from './infra/services/super-tokens/super-tokens.module';
import { authConfig } from 'configs/auth.config';
import { AUTH_SERVICE_TOKEN } from './constants';
import { SuperTokensAuthService } from './infra/services/auth-service/super-tokens/SuperTokens';
import {
  USER_REGISTER_EVENT_NAME,
  UserRegisteredListener,
} from './application/events/listeners/user-registered.listener.js';
import { QueryHandlers } from './application/queries/index';

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
  controllers: [CustomersController],
  providers: [
    UserRegisteredListener,
    ...QueryHandlers,
    { provide: AUTH_SERVICE_TOKEN, useClass: SuperTokensAuthService },
  ],
})
export class CustomersModule {}
