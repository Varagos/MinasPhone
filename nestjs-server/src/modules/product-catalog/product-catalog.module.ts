import { Logger, Module, Provider } from '@nestjs/common';
import { CreateCategoryCommandHandler } from './application/categories/commands/create-category/create-category.handler';
import { DeleteCategoryCommandHandler } from './application/categories/commands/delete-category/delete-category.handler';
import { FindCategoriesQueryHandler } from './application/categories/queries/find-categories/find-categories.handler';
import { FindCategoryByIdQueryHandler } from './application/categories/queries/find-category-by-id/find-category-by-id.handler';
import { CategoryMapper } from './infra/mappers/category.mapper';
import {
  CATEGORY_REPO,
  CLOUD_STORAGE_SERVICE,
  PRODUCT_REPO,
} from './constants';
import { CategoryRepository } from './infra/database/category.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateCategoryCommandHandler } from './application/categories/commands/update-category/update-category.handler';
import { FindProductsQueryHandler } from './application/products/queries/find-products/find-products.handler';
import { FindProductImageQueryHandler } from './application/products/queries/find-image/find-image.handler';
import { CreateProductCommandHandler } from './application/products/commands/create-product/create-product.handler';
import { ProductRepository } from './infra/database/product.repository';
import { ProductMapper } from './infra/mappers/product.mapper';
import { DeleteProductCommandHandler } from './application/products/commands/delete-product/delete-product.handler';
import { UpdateProductCommandHandler } from './application/products/commands/update-product/update-product.handler';
import { UploadImageCommandHandler } from './application/images/commands/upload-image/upload-image.handler';
import { GoogleCloudStorageServiceAdapter } from './infra/services/cloud-storage/google-cloud-storage.service';
import { FindProductByIdQueryHandler } from './application/products/queries/find-product-by-id/find-product-by-id.handler';
import { DeleteImageAfterProductDeletionDomainEventHandler } from './application/images/event-handlers/delete-image-after-product-deletion.domain-event-handler';
import { DeleteImageCommandHandler } from './application/images/commands/delete-image/delete-image.handler';
import { DeleteOldImageAfterProductImageUpdateDomainEventHandler } from './application/images/event-handlers/delete-old-image-after-product-image-update.domain-event-handler';

const commandHandlers: Provider[] = [
  // Category
  CreateCategoryCommandHandler,
  CreateCategoryCommandHandler,
  DeleteCategoryCommandHandler,
  UpdateCategoryCommandHandler,
  // Product
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  UpdateProductCommandHandler,
  // Image
  UploadImageCommandHandler,
  DeleteImageCommandHandler,
];

const queryHandlers: Provider[] = [
  FindCategoriesQueryHandler,
  FindCategoryByIdQueryHandler,
  FindProductsQueryHandler,
  FindProductImageQueryHandler,
  FindProductByIdQueryHandler,
];

const eventHandlers: Provider[] = [
  DeleteImageAfterProductDeletionDomainEventHandler,
  DeleteOldImageAfterProductImageUpdateDomainEventHandler,
];

const mappers: Provider[] = [CategoryMapper, ProductMapper];

const repositories: Provider[] = [
  { provide: CATEGORY_REPO, useClass: CategoryRepository },
  { provide: PRODUCT_REPO, useClass: ProductRepository },
];

const services: Provider[] = [
  {
    provide: CLOUD_STORAGE_SERVICE,
    useClass: GoogleCloudStorageServiceAdapter,
  },
];

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...mappers,
    ...services,
  ],
})
export class ProductCatalogModule {}
