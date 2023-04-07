import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
  Provider,
} from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';
import { SupertokensService } from './supertokens.service';
import {
  AuthModuleConfig,
  ConfigInjectionToken,
  UserRegisterEventTopicToken,
} from './config.interface.js';

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
    const providers: Provider<any>[] = [
      {
        useValue: {
          appInfo,
          connectionURI,
          apiKey,
        },
        provide: ConfigInjectionToken,
      },
      {
        useValue: userRegisteredEventName,
        provide: UserRegisterEventTopicToken,
      },
      SupertokensService,
    ];
    return {
      module: SuperTokensAuthModule,
      providers,
      exports: [],
    };
  }
}
