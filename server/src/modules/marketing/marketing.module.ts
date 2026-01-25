import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductCatalogModule } from '@modules/product-catalog/product-catalog.module';
import { MarketingService } from './marketing.service';
import { GOOGLE_MERCHANT_SERVICE } from './constants';
import { GoogleMerchantService } from './infra/services/google-merchant.service';
import { ProductToGoogleMerchantMapper } from './application/services/product-to-google-merchant.mapper';
import { SyncProductToGoogleMerchantCommandHandler } from './application/google-merchant/commands/sync-product/sync-product.handler';
import { SyncAllProductsToGoogleMerchantCommandHandler } from './application/google-merchant/commands/sync-all-products/sync-all-products.handler';
import { SyncProductToGoogleMerchantOnCreatedEventHandler } from './application/google-merchant/event-handlers/sync-product-on-created.event-handler';
import { SyncProductToGoogleMerchantOnUpdatedEventHandler } from './application/google-merchant/event-handlers/sync-product-on-updated.event-handler';
import { DeleteProductFromGoogleMerchantOnDeletedEventHandler } from './application/google-merchant/event-handlers/delete-product-on-deleted.event-handler';

const commandHandlers: Provider[] = [
  SyncProductToGoogleMerchantCommandHandler,
  SyncAllProductsToGoogleMerchantCommandHandler,
];

const eventHandlers: Provider[] = [
  SyncProductToGoogleMerchantOnCreatedEventHandler,
  SyncProductToGoogleMerchantOnUpdatedEventHandler,
  DeleteProductFromGoogleMerchantOnDeletedEventHandler,
];

const services: Provider[] = [
  {
    provide: GOOGLE_MERCHANT_SERVICE,
    useClass: GoogleMerchantService,
  },
  ProductToGoogleMerchantMapper,
];

@Module({
  imports: [CqrsModule, ProductCatalogModule],
  controllers: [],
  providers: [
    MarketingService,
    ...commandHandlers,
    ...eventHandlers,
    ...services,
  ],
})
export class MarketingModule {}
