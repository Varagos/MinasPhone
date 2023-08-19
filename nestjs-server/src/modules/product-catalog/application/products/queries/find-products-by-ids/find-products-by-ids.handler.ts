import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result, Err } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { NotFoundException } from '@libs/exceptions';
import { FindProductsByIdsQuery } from './find-products-by-ids.query';
import {
  ProductModel,
  productSchema,
} from '@modules/product-catalog/infra/database/product.repository';

export type FindProductsByIdsQueryResponse = Result<
  readonly Readonly<ProductModel>[],
  Error
>;

@QueryHandler(FindProductsByIdsQuery)
export class FindProductsByIdsQueryHandler implements IQueryHandler {
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
    query: FindProductsByIdsQuery,
  ): Promise<FindProductsByIdsQueryResponse> {
    const ids = query.ids;
    /**
     * Constructing a query with Slonik.
     * More info: https://contra.com/p/AqZWWoUB-writing-composable-sql-using-java-script
     */
    const queryStatement = sql.type(productSchema)`
  SELECT *
  FROM products
  WHERE id IN (${sql.join(
    ids.map((id) => sql`${id}`),
    sql`,`,
  )})
`;

    const result = await this.pool.query(queryStatement);
    if (!result) {
      return Err(new NotFoundException());
    }
    const rows: readonly ProductModel[] = result.rows;
    return Ok(rows);
  }
}
