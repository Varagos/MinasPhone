import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, SchemaValidationError, sql } from 'slonik';
import {
  ProductModel,
  productSchema,
  ProductSitemapModel,
  productSitemapSchema,
} from '@modules/product-catalog/infra/database/product.repository';
import { Logger } from '@nestjs/common';
import { FindAllProductSlugsQuery } from './find-all-product-slugs.query';
import { Paginated } from '@libs/ddd';

export type FindProductsResponse = Result<
  Paginated<ProductSitemapModel>,
  Error
>;

@QueryHandler(FindAllProductSlugsQuery)
export class FindAllProductSlugsQueryHandler
  implements IQueryHandler<FindAllProductSlugsQuery>
{
  private readonly logger = new Logger(FindAllProductSlugsQueryHandler.name);
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
    _query: FindAllProductSlugsQuery,
  ): Promise<FindProductsResponse> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(productSitemapSchema)`
         SELECT id,slug,updated_at
         FROM products
         WHERE active = TRUE
         LIMIT 10000
`;

    try {
      const records = await this.pool.query(statement);
      return Ok(
        new Paginated({
          data: records.rows,
          count: records.rowCount,
          limit: 10000,
          page: 1,
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
