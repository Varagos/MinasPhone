import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { FindProductImageQuery } from './find-products.query';
import {
  ProductModel,
  productSchema,
} from '@modules/product-catalog/infra/database/product.repository';
import { NotFoundException } from '@libs/exceptions';

export type FindProductsResponse = Result<ProductModel, Error>;

@QueryHandler(FindProductImageQuery)
export class FindProductImageQueryHandler implements IQueryHandler {
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
  async execute(query: FindProductImageQuery): Promise<FindProductsResponse> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(productSchema)`
         SELECT *
         FROM products
         WHERE
            id = ${query.id}`;

    const result = await this.pool.maybeOne(statement);
    if (!result) {
      return Err(new NotFoundException());
    }
    return Ok(result);
  }
}
