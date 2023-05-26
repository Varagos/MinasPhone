import { Logger, Module, Provider } from '@nestjs/common';
import { CreateCategoryCommandHandler } from './application/categories/commands/create-category/create-category.handler';
import { DeleteCategoryCommandHandler } from './application/categories/commands/delete-category/delete-category.handler';
import { FindCategoriesQueryHandler } from './application/categories/queries/find-categories/find-categories.handler';
import { FindCategoryByIdQueryHandler } from './application/categories/queries/find-category-by-id/find-category-by-id.handler';
import { CategoryMapper } from './infra/mappers/category.mapper';
import { CATEGORY_REPO, PRODUCT_REPO } from './constants';
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

const commandHandlers: Provider[] = [
  CreateCategoryCommandHandler,
  CreateCategoryCommandHandler,
  DeleteCategoryCommandHandler,
  UpdateCategoryCommandHandler,
  CreateProductCommandHandler,
  DeleteProductCommandHandler,
  UpdateProductCommandHandler,
];

const queryHandlers: Provider[] = [
  FindCategoriesQueryHandler,
  FindCategoryByIdQueryHandler,
  FindProductsQueryHandler,
  FindProductImageQueryHandler,
];

const mappers: Provider[] = [CategoryMapper, ProductMapper];

const repositories: Provider[] = [
  { provide: CATEGORY_REPO, useClass: CategoryRepository },
  { provide: PRODUCT_REPO, useClass: ProductRepository },
];

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class ProductCatalogModule {}
