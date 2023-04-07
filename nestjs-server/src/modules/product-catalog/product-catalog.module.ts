import { Module } from '@nestjs/common';
import { ProductCatalogService } from './product-catalog.service';
import { ProductCatalogController } from './product-catalog.controller';

@Module({
  controllers: [ProductCatalogController],
  providers: [ProductCatalogService]
})
export class ProductCatalogModule {}
