import { Logger, Module, Provider } from '@nestjs/common';
import { FindCategoriesHttpController } from './application/categories/queries/find-categories/find-categories.http.controller';
import { CreateCategoryCommandHandler } from './application/categories/commands/create-category/create-category.handler';
import { DeleteCategoryCommandHandler } from './application/categories/commands/delete-category/delete-category.handler';
import { FindCategoriesQueryHandler } from './application/categories/queries/find-categories/find-categories.handler';
import { FindCategoryByIdQueryHandler } from './application/categories/queries/find-category-by-id/find-category-by-id.handler';
import { CategoryMapper } from './infra/mappers/category.mapper';
import { CATEGORY_REPO, PRODUCT_REPO } from './constants';
import { CategoryRepository } from './infra/database/category.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { FindCategoryByIdHttpController } from './application/categories/queries/find-category-by-id/find-category-by-id.http.controller';
import { CreateCategoryHttpController } from './application/categories/commands/create-category/create-category.http.controller';
import { DeleteCategoryHttpController } from './application/categories/commands/delete-category/delete-category.http.controller';
import { UpdateCategoryHttpController } from './application/categories/commands/update-category/update-category.http.controller';
import { UpdateCategoryCommandHandler } from './application/categories/commands/update-category/update-category.handler';
import { FindProductsQueryHandler } from './application/products/queries/find-products/find-products.handler';
import { FindProductsHttpController } from './application/products/queries/find-products/find-products.http.controller';
import { FindProductImageQueryHandler } from './application/products/queries/find-image/find-image.handler';
import { FindProductImageHttpController } from './application/products/queries/find-image/find-image.http.controller';
import { CreateProductHttpController } from './application/products/commands/create-product/create-product.http.controller';
import { CreateProductCommandHandler } from './application/products/commands/create-product/create-product.handler';
import { ProductRepository } from './infra/database/product.repository';
import { ProductMapper } from './infra/mappers/product.mapper';
import { DeleteProductCommandHandler } from './application/products/commands/delete-product/delete-product.handler';
import { DeleteProductHttpController } from './application/products/commands/delete-product/delete-product.http.controller';
import { UpdateProductHttpController } from './application/products/commands/update-product/update-product.http.controller';
import { UpdateProductCommandHandler } from './application/products/commands/update-product/update-product.handler';

const httpControllers = [
  FindCategoriesHttpController,
  FindCategoryByIdHttpController,
  CreateCategoryHttpController,
  DeleteCategoryHttpController,
  UpdateCategoryHttpController,
  FindProductsHttpController,
  FindProductImageHttpController,
  CreateProductHttpController,
  DeleteProductHttpController,
  UpdateProductHttpController,
];

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
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class ProductCatalogModule {}
