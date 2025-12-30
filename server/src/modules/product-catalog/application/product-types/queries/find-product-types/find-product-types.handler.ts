import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result, Ok } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { FindProductTypesQuery } from './find-product-types.query';
import { Paginated } from '@libs/ddd/index';
import { z } from 'zod';

// Lightweight schema for list view - only basic attribute config, no values
export const productTypeListSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  attributes: z.array(
    z.object({
      attributeId: z.string().uuid(),
      attributeName: z.string(),
      isRequired: z.boolean(),
      isFilterable: z.boolean(),
      isSearchable: z.boolean(),
      displayOrder: z.number().nullable(),
    }),
  ),
});

export type ProductTypeListModel = z.TypeOf<typeof productTypeListSchema>;

@QueryHandler(FindProductTypesQuery)
export class FindProductTypesQueryHandler
  implements IQueryHandler<FindProductTypesQuery>
{
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  async execute(
    query: FindProductTypesQuery,
  ): Promise<Result<Paginated<ProductTypeListModel>, Error>> {
    const statement = sql.type(productTypeListSchema)`
      SELECT
        pt.id,
        pt.name,
        pt.created_at,
        pt.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'attributeId', a.id,
              'attributeName', a.name,
              'isRequired', pta.is_required,
              'isFilterable', pta.is_filterable,
              'isSearchable', pta.is_searchable,
              'displayOrder', pta.display_order
            ) ORDER BY pta.display_order ASC
          ) FILTER (WHERE a.id IS NOT NULL),
          '[]'::json
        ) as attributes
      FROM product_types pt
      LEFT JOIN product_type_attributes pta ON pt.id = pta.product_type_id
      LEFT JOIN attributes a ON pta.attribute_id = a.id
      WHERE
        ${query.name ? sql`pt.name ILIKE ${'%' + query.name + '%'}` : true}
      GROUP BY pt.id
      LIMIT ${query.limit}
      OFFSET ${query.offset}
    `;

    // Count query for pagination
    const countStatement = sql`
      SELECT count(*) FROM product_types pt
      WHERE
        ${query.name ? sql`pt.name ILIKE ${'%' + query.name + '%'}` : true}
    `;

    const [records, countResult] = await Promise.all([
      this.pool.query(statement),
      this.pool.one(countStatement),
    ]);

    // Slonik 'one' returns generic result, access property 'count' if mapped, or check structure.
    // Actually using sql.type above with 'void' might not implicitly type 'count'.
    // Better to use untyped or simple type for count.

    return Ok(
      new Paginated({
        data: records.rows,
        count: Number((countResult as any).count),
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
