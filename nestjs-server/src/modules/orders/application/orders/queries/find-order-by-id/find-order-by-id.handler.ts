import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result, Err } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { FindOrderByIdQuery } from './find-order-by-id.query';
import { NotFoundException } from '@libs/exceptions';
import {
  OrderModel,
  orderSchema,
} from '@modules/orders/infra/database/order.repository';

export type FindOrderByIdQueryResponse = Result<OrderModel, Error>;

@QueryHandler(FindOrderByIdQuery)
export class FindOrderByIdQueryHandler implements IQueryHandler {
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
    query: FindOrderByIdQuery,
  ): Promise<FindOrderByIdQueryResponse> {
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const statement = sql.type(orderSchema)`
         SELECT *
         FROM orders
         WHERE
          id = ${query.id}`;

    const result = await this.pool.maybeOne(statement);
    if (!result) {
      return Err(new NotFoundException());
    }

    return Ok(result);
  }
}
