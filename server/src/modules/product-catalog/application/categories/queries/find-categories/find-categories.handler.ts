import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, SchemaValidationError, sql } from 'slonik';
import { FindCategoriesQuery } from './find-categories.query';
import { Paginated } from '@libs/ddd/index';
import {
  CategoryModel,
  categorySchema,
} from '@modules/product-catalog/infra/database/category.repository';

@QueryHandler(FindCategoriesQuery)
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
    query: FindCategoriesQuery,
  ): Promise<Result<Paginated<CategoryModel>, Error>> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const { id } = query;

    // Every one could be an array
    const idArray = id ? (Array.isArray(id) ? id : [id]) : [];

    const statement = sql.type(categorySchema)`
         SELECT *
         FROM categories
         WHERE
           ${
             idArray.length > 0
               ? sql`id = ANY(${sql.array(idArray, 'uuid')})`
               : true
           } AND
           ${query.slug ? sql`slug = ${query.slug}` : true} AND
           ${query.name ? sql`name = ${query.name}` : true} AND
           ${query.parentId ? sql`parent_id = ${query.parentId}` : true}
         LIMIT ${query.limit}
         OFFSET ${query.offset}`;

    const records = await this.pool.query(statement);
    return Ok(
      new Paginated({
        data: records.rows,
        count: records.rowCount,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
