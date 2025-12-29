import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result, Ok } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { FindAttributesQuery } from './find-attributes.query';
import { Paginated } from '@libs/ddd';
import {
  attributeViewSchema,
  AttributeModel,
} from '../find-attribute/find-attribute.handler';

@QueryHandler(FindAttributesQuery)
export class FindAttributesQueryHandler
  implements IQueryHandler<FindAttributesQuery>
{
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  async execute(
    query: FindAttributesQuery,
  ): Promise<Result<Paginated<AttributeModel>, Error>> {
    // const statement = sql`
    const statement = sql.type(attributeViewSchema)`
      SELECT 
        a.id,
        a.name,
        a.value_type as "valueType",
        a.input_type as "inputType",
        a.unit,
        a.created_at,
        a.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', av.id,
              'value', av.value,
              'displayOrder', av.display_order,
              'created_at', av.created_at,
              'updated_at', av.updated_at
            ) ORDER BY av.display_order ASC
          ) FILTER (WHERE av.id IS NOT NULL),
          '[]'::json
        ) as "values"
      FROM attributes a
      LEFT JOIN attribute_values av ON a.id = av.attribute_id
      WHERE
        ${query.name ? sql`a.name ILIKE ${'%' + query.name + '%'}` : sql`TRUE`}
      GROUP BY a.id
      LIMIT ${query.limit}
      OFFSET ${query.offset}
    `;

    const countStatement = sql`
      SELECT count(*) FROM attributes a
      WHERE
    ${query.name ? sql`a.name ILIKE ${'%' + query.name + '%'}` : sql`TRUE`}
    `;

    const [records, countResult] = await Promise.all([
      this.pool.query(statement),
      this.pool.one(countStatement),
    ]);

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
