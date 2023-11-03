import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
  Provider,
} from '@nestjs/common';

import { AuthMiddleware } from './middlewares/auth.middleware';
import { SuperTokensInitService } from './services/supertokens-init.service';
import {
  AuthModuleConfig,
  ConfigInjectionToken,
  UserRegisterEventTopicToken,
} from './config.interface.js';
import { SupertokensUserRolesService } from './services/roles.service';
import { SuperTokensAuthService } from './services/auth.service';
import { RolesInitializerService } from './services/roles-init.service';
export { AuthGuard } from './guards/auth.guard';
export { RolesGuard } from './guards/roles.guard';
export { Session } from './decorators/session.decorator';

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class SuperTokensAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
    userRegisteredEventName,
  }: AuthModuleConfig): DynamicModule {
    const config: AuthModuleConfig = {
      connectionURI,
      apiKey,
      appInfo,
      userRegisteredEventName,
    };
    const providers: Provider<any>[] = [
      {
        useValue: config,
        provide: ConfigInjectionToken,
      },
      {
        useValue: userRegisteredEventName,
        provide: UserRegisterEventTopicToken,
      },
      SuperTokensInitService,
      SupertokensUserRolesService,
      SuperTokensAuthService,
      RolesInitializerService,
    ];
    return {
      module: SuperTokensAuthModule,
      providers,
      exports: [SuperTokensAuthService, SupertokensUserRolesService],
    };
  }
}
