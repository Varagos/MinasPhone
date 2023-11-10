import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, SchemaValidationError, sql } from 'slonik';
import { FindProductsQuery } from './find-products.query';
import { Paginated } from '@libs/ddd/index';
import {
  ProductModel,
  productSchema,
} from '@modules/product-catalog/infra/database/product.repository';
import { Logger } from '@nestjs/common';

export type FindProductsResponse = Result<Paginated<ProductModel>, Error>;

// Mapping from API fields to database columns
const fieldToColumnMapping: Record<string, string> = {
  slug: 'slug',
  name: 'name',
  price: 'price',
  quantity: 'quantity',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  id: 'id',
  reference: 'reference',
};

@QueryHandler(FindProductsQuery)
export class FindProductsQueryHandler implements IQueryHandler {
  private readonly logger = new Logger(FindProductsQueryHandler.name);
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
  async execute(query: FindProductsQuery): Promise<FindProductsResponse> {
    let sortClause = sql``;
    if (typeof query.orderBy.field === 'string') {
      const sortField = fieldToColumnMapping[query.orderBy.field];
      const sortOrder = query.orderBy.param;
      if (sortField && ['asc', 'desc'].includes(sortOrder)) {
        // console.log(sortOrder);
        sortClause =
          sortOrder === 'asc'
            ? sql`ORDER BY ${sql.identifier([sortField])} ASC `
            : sql`ORDER BY ${sql.identifier([sortField])} DESC `;
      }
    } // else: default to no sorting, or specify a default sort field here

    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(productSchema)`
         SELECT *
         FROM products
         WHERE
           ${query.slug ? sql`slug = ${query.slug}` : true} AND
           ${
             query.categoryId ? sql`category_id = ${query.categoryId}` : true
           } AND
           ${query.name ? sql`name ILIKE ${'%' + query.name + '%'}` : true}
           ${sortClause}
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
      this.logger.error(e);
      throw e;
    }
  }
}
