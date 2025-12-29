import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result, Ok, Err } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { FindAttributeQuery } from './find-attribute.query';
import { NotFoundException } from '@libs/exceptions';
import { z } from 'zod';
import {
  InputTypes,
  ValueTypes,
} from '@modules/product-catalog/domain/attribute.entity';

// Define the view schema to match the database query result structure
export const attributeViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  valueType: z.enum(ValueTypes),
  inputType: z.enum(InputTypes),
  unit: z.string().nullable(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  values: z.array(
    z.object({
      id: z.string().uuid(),
      value: z.string(),
      displayOrder: z.number().nullable(),
      created_at: z.preprocess((val: any) => new Date(val), z.date()),
      updated_at: z.preprocess((val: any) => new Date(val), z.date()),
    }),
  ),
});

export type AttributeModel = z.TypeOf<typeof attributeViewSchema>;

@QueryHandler(FindAttributeQuery)
export class FindAttributeQueryHandler
  implements IQueryHandler<FindAttributeQuery>
{
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  async execute(
    query: FindAttributeQuery,
  ): Promise<Result<AttributeModel, Error>> {
    const statement = sql.type(attributeViewSchema)`
      SELECT 
        a.id,
        a.name,
        a.value_type as "valueType",
        a.input_type as "inputType",
        a.unit,
        a.created_at,
        a.updated_at,
        json_agg(
          json_build_object(
            'id', av.id,
            'value', av.value,
            'displayOrder', av.display_order,
            'created_at', av.created_at,
            'updated_at', av.updated_at
          ) ORDER BY av.display_order ASC
        ) FILTER (WHERE av.id IS NOT NULL)
        as "values"
      FROM attributes a
      LEFT JOIN attribute_values av ON a.id = av.attribute_id
      WHERE a.id = ${query.attributeId}
      GROUP BY a.id
    `;

    const result = await this.pool.query(statement);

    if (result.rowCount === 0) {
      return Err(new NotFoundException('Attribute not found'));
    }

    return Ok(result.rows[0]);
  }
}
