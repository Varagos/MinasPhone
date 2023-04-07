import { Module } from '@nestjs/common';

import { OrdersModule } from './modules/orders/orders.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductCatalogModule } from './modules/product-catalog/product-catalog.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SuperTokensAuthModule } from './modules/customers/infra/services/super-tokens/super-tokens.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RequestContextModule,
    CqrsModule,

    // Modules
    OrdersModule,
    CustomersModule,
    ProductCatalogModule,
    ShippingModule,
    MarketingModule,
    AnalyticsModule,
    SuperTokensAuthModule,
  ],
  providers: [],
})
export class AppModule {}
