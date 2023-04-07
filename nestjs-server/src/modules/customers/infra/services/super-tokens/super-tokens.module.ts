import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
  Provider,
} from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';
import {
  ConfigInjectionToken,
  AuthModuleConfig,
  UserRegisterEventTopicToken,
} from './config.interface';
import { SupertokensService } from './supertokens.service';

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
