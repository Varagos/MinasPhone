import { Module } from '@nestjs/common';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

import { OrdersModule } from './modules/orders/orders.module';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { ProductCatalogModule } from './modules/product-catalog/product-catalog.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { CqrsModule } from '@nestjs/cqrs';
import { SlonikModule } from 'nestjs-slonik';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from '@libs/application/context/ContextInterceptor';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { postgresConnectionUri } from '@config/database.config';
import { ApiModule } from '@api/api.module';

const interceptors = [
  {
    provide: APP_FILTER,
    useClass: SentryGlobalFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];
@Module({
  imports: [
    SentryModule.forRoot(),
    EventEmitterModule.forRoot(),
    RequestContextModule,
    CqrsModule,
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
    }),

    // Modules
    OrdersModule,
    UserManagementModule,
    ProductCatalogModule,
    ShippingModule,
    MarketingModule,
    AnalyticsModule,
    NotificationsModule,
    ApiModule,
  ],
  providers: [...interceptors],
})
export class AppModule {}
