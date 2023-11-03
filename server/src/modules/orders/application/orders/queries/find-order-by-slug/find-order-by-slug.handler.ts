import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result, Err } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { FindOrderBySlugQuery } from './find-order-by-slug.query';
import { NotFoundException } from '@libs/exceptions';
import {
  OrderModel,
  orderSchema,
} from '@modules/orders/infra/database/order.repository';

export type FindOrderBySlugQueryResponse = Result<OrderModel, Error>;

@QueryHandler(FindOrderBySlugQuery)
export class FindOrderBySlugQueryHandler implements IQueryHandler {
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
    query: FindOrderBySlugQuery,
  ): Promise<FindOrderBySlugQueryResponse> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(orderSchema)`
         SELECT *
         FROM orders
         WHERE
          slug = ${query.slug}`;

    const result = await this.pool.maybeOne(statement);
    if (!result) {
      return Err(new NotFoundException());
    }

    return Ok(result);
  }
}
