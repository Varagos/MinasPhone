import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, SchemaValidationError, sql } from 'slonik';
import { FindProductsByCategorySlugQuery } from './find-products-by-category-slug.query';
import { Paginated } from '@libs/ddd/index';
import {
  ProductModel,
  productSchema,
} from '@modules/product-catalog/infra/database/product.repository';
import { categorySchema } from '@modules/product-catalog/infra/database/category.repository';
import { NotFoundException } from '@nestjs/common';

export type FindProductsByCategorySlugResponse = Result<
  Paginated<ProductModel>,
  Error
>;

@QueryHandler(FindProductsByCategorySlugQuery)
export class FindProductsByCategorySlugQueryHandler implements IQueryHandler {
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
    query: FindProductsByCategorySlugQuery,
  ): Promise<FindProductsByCategorySlugResponse> {
    const categoryStatement = sql.type(categorySchema)`
          SELECT *
          FROM categories
          WHERE
            ${sql`slug = ${query.slug}`}`;

    const categoryResult = await this.pool.maybeOne(categoryStatement);
    if (!categoryResult) {
      throw new NotFoundException();
    }
    const categoryId = categoryResult.id;

    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(productSchema)`
         SELECT *
         FROM products
         WHERE ${sql`category_id = ${categoryId}`}
         LIMIT ${query.limit}
         OFFSET ${query.offset}`;

    try {
      const records = await this.pool.query(statement);
      return Ok(
        new Paginated({
          data: records.rows,
          count: records.rowCount,
          limit: query.limit,
          page: query.page,
        }),
      );
    } catch (e) {
      if (e instanceof SchemaValidationError) {
        console.error(e.issues);
      }
      console.log(e);
      throw e;
    }
  }
}
