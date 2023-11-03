import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, SchemaValidationError, sql } from 'slonik';
import { FindOrdersQuery } from './find-orders.query';
import { Paginated } from '@libs/ddd/index';
import {
  OrderModel,
  orderSchema,
} from '@modules/orders/infra/database/order.repository';
import { Logger } from '@nestjs/common';

export type FindOrdersResponse = Result<Paginated<OrderModel>, Error>;

// Mapping from API fields to database columns
const fieldToColumnMapping: Record<string, string> = {
  email: 'email',
  phoneNumber: 'phone',
  firstName: 'first_name',
  lastName: 'last_name',
  status: 'status',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  id: 'id',
};

@QueryHandler(FindOrdersQuery)
export class FindOrdersQueryHandler implements IQueryHandler {
  private readonly logger = new Logger(FindOrdersQueryHandler.name);
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
  async execute(query: FindOrdersQuery): Promise<FindOrdersResponse> {
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
    const statement = sql.type(orderSchema)`
         SELECT *
         FROM orders
         WHERE
           ${query.email ? sql`email = ${query.email}` : true} AND
           ${query.phoneNumber ? sql`phone = ${query.phoneNumber}` : true} AND
            ${query.firstName ? sql`first_name = ${query.firstName}` : true} AND
            ${query.lastName ? sql`last_name = ${query.lastName}` : true} AND
            ${query.status ? sql`status = ${query.status}` : true}
         ${sortClause}
         LIMIT ${query.limit}
         OFFSET ${query.offset}`;

    // console.log(statement.sql);
    try {
      const records = await this.pool.query(statement);
      // console.log(records);
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
