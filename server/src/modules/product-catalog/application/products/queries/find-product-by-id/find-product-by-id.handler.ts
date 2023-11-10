import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result, Err } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { NotFoundException } from '@libs/exceptions';
import { FindProductByIdQuery } from './find-product-by-id.query';
import {
  ProductModel,
  productSchema,
} from '@modules/product-catalog/infra/database/product.repository';

export type FindProductByIdQueryResponse = Result<ProductModel, Error>;

@QueryHandler(FindProductByIdQuery)
export class FindProductByIdQueryHandler implements IQueryHandler {
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
    query: FindProductByIdQuery,
  ): Promise<FindProductByIdQueryResponse> {
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
