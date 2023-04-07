import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result, Err } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import {
  CategoryModel,
  categorySchema,
} from '@modules/product-catalog/infra/database/category.repository.js';
import { FindCategoryByIdQuery } from './find-category-by-id.query.js';
import { NotFoundException } from '@libs/exceptions';

@QueryHandler(FindCategoryByIdQuery)
export class FindCategoriesQueryHandler implements IQueryHandler {
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  /**
   * In read model we don't need to execute
   * any business logic, so we can bypass
   * domain and repository layers completely
   * and execute query directly
   */
  async execute(
    query: FindCategoryByIdQuery,
  ): Promise<Result<CategoryModel, Error>> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(categorySchema)`
         SELECT *
         FROM categories
         WHERE
            ${`id = ${query.id}`}`;

    const result = await this.pool.maybeOne(statement);
    if (!result) {
      return Err(new NotFoundException());
    }

    return Ok(result);
  }
}
