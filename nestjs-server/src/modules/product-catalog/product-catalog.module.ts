import { Logger, Module, Provider } from '@nestjs/common';
import { FindCategoriesHttpController } from './application/categories/queries/find-categories/find-categories.http.controller';
import { CreateCategoryCommandHandler } from './application/categories/commands/create-category/create-category.handler';
import { DeleteCategoryCommandHandler } from './application/categories/commands/delete-category/delete-category.handler';
import { FindCategoriesQueryHandler } from './application/categories/queries/find-categories/find-categories.handler';
import { FindCategoryByIdQueryHandler } from './application/categories/queries/find-category-by-id/find-category-by-id.handler';
import { CategoryMapper } from './infra/mappers/category.mapper';
import { CATEGORY_REPO } from './constants';
import { CategoryRepository } from './infra/database/category.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { FindCategoryByIdHttpController } from './application/categories/queries/find-category-by-id/find-category-by-id.http.controller';

const httpControllers = [
  FindCategoriesHttpController,
  FindCategoryByIdHttpController,
];

const commandHandlers: Provider[] = [
  CreateCategoryCommandHandler,
  CreateCategoryCommandHandler,
  DeleteCategoryCommandHandler,
];

const queryHandlers: Provider[] = [
  FindCategoriesQueryHandler,
  FindCategoryByIdQueryHandler,
];

const mappers: Provider[] = [CategoryMapper];

const repositories: Provider[] = [
  { provide: CATEGORY_REPO, useClass: CategoryRepository },
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
