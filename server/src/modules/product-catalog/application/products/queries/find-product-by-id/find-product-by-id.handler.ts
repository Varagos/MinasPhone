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
export class FindProductByIdQueryHandler
  implements IQueryHandler<FindProductByIdQuery>
{
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
     * Fetch product with attribute values joined
     */
    const statement = sql.type(productSchema)`
      SELECT
        p.*,
        COALESCE(
          (
            SELECT json_object_agg(
              attribute_id::text,
              attribute_values
            )
            FROM (
              SELECT
                pav.attribute_id,
                json_agg(
                  json_build_object(
                    'value_id', pav.attribute_value_id,
                    'text_value', pav.text_value,
                    'numeric_value', pav.numeric_value,
                    'boolean_value', pav.boolean_value
                  )
                ) as attribute_values
              FROM product_attribute_values pav
              WHERE pav.product_id = p.id
              GROUP BY pav.attribute_id
            ) grouped
          ),
          '{}'::json
        ) AS attribute_values
      FROM products p
      WHERE p.id = ${query.id}
    `;

    const result = await this.pool.maybeOne(statement);
    if (!result) {
      return Err(new NotFoundException());
    }

    return Ok(result);
  }
}
