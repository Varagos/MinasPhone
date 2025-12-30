import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result, Ok, Err } from 'oxide.ts';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { FindProductTypeQuery } from './find-product-type.query';
import { NotFoundException } from '@libs/exceptions';
import { z } from 'zod';

// Define the schema for the query response
export const productTypeViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  attributes: z.array(
    z.object({
      attributeId: z.string().uuid(),
      attributeName: z.string(),
      valueType: z.enum(['string', 'number', 'boolean', 'enum', 'multiselect']),
      inputType: z.enum([
        'text',
        'number',
        'select',
        'multiselect',
        'checkbox',
        'radio',
      ]),
      unit: z.string().nullable(),
      isRequired: z.boolean(),
      isFilterable: z.boolean(),
      isSearchable: z.boolean(),
      displayOrder: z.number().nullable(),
      attributeValues: z.array(
        z.object({
          id: z.string().uuid(),
          value: z.string(),
          displayOrder: z.number(),
        }),
      ),
    }),
  ),
});

export type ProductTypeModel = z.TypeOf<typeof productTypeViewSchema>;

@QueryHandler(FindProductTypeQuery)
export class FindProductTypeQueryHandler
  implements IQueryHandler<FindProductTypeQuery>
{
  constructor(
    @InjectPool()
    private readonly pool: DatabasePool,
  ) {}

  async execute(
    query: FindProductTypeQuery,
  ): Promise<Result<ProductTypeModel, Error>> {
    const statement = sql.type(productTypeViewSchema)`
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
              'valueType', a.value_type,
              'inputType', a.input_type,
              'unit', a.unit,
              'isRequired', pta.is_required,
              'isFilterable', pta.is_filterable,
              'isSearchable', pta.is_searchable,
              'displayOrder', pta.display_order,
              'attributeValues', (
                SELECT COALESCE(
                  json_agg(
                    json_build_object(
                      'id', av.id,
                      'value', av.value,
                      'displayOrder', av.display_order
                    ) ORDER BY av.display_order
                  ),
                  '[]'::json
                )
                FROM attribute_values av
                WHERE av.attribute_id = a.id
              )
            ) ORDER BY pta.display_order ASC
          ) FILTER (WHERE a.id IS NOT NULL),
          '[]'::json
        ) as attributes
      FROM product_types pt
      LEFT JOIN product_type_attributes pta ON pt.id = pta.product_type_id
      LEFT JOIN attributes a ON pta.attribute_id = a.id
      WHERE pt.id = ${query.id}
      GROUP BY pt.id
    `;

    const result = await this.pool.maybeOne(statement);

    if (!result) {
      return Err(new NotFoundException());
    }

    return Ok(result);
  }
}
