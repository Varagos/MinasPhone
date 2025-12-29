import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductTypeEntity } from '@modules/product-catalog/domain/product-type.entity';
import { ProductTypeRepositoryPort } from '@modules/product-catalog/domain/ports/product-type.repository.port';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { ProductTypeMapper } from '../mappers/product-type.mapper';
import { None, Option, Some } from 'oxide.ts';

// Schema for product_type_attributes join table
export const productTypeAttributeSchema = z.object({
  product_type_id: z.string().uuid(),
  attribute_id: z.string().uuid(),
  is_required: z.boolean(),
  is_filterable: z.boolean(),
  is_searchable: z.boolean(),
  display_order: z.number().nullable(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
});

export type ProductTypeAttributeModel = z.TypeOf<
  typeof productTypeAttributeSchema
>;

export const productTypeAttributeConfigSchema = z.object({
  attributeId: z.string().uuid(),
  config: z.object({
    isRequired: z.boolean(),
    isFilterable: z.boolean(),
    isSearchable: z.boolean(),
    displayOrder: z.number().nullable(),
  }),
});

export const productTypeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string().min(1).max(255),
  attributes: z.array(productTypeAttributeConfigSchema),
});

export type ProductTypeModel = z.TypeOf<typeof productTypeSchema>;

@Injectable()
export class ProductTypeRepository
  extends SqlRepositoryBase<ProductTypeEntity, ProductTypeModel>
  implements ProductTypeRepositoryPort
{
  protected tableName = 'product_types';
  protected attributesTableName = 'product_type_attributes';
  protected schema = productTypeSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: ProductTypeMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(ProductTypeRepository.name));
  }

  // Override findOneById to join with product_type_attributes
  override async findOneById(id: string): Promise<Option<ProductTypeEntity>> {
    const query = sql.type(this.schema)`
      SELECT pt.*, 
      COALESCE(
        json_agg(
          json_build_object(
            'attributeId', pta.attribute_id,
            'config', json_build_object(
              'isRequired', pta.is_required,
              'isFilterable', pta.is_filterable,
              'isSearchable', pta.is_searchable,
              'displayOrder', pta.display_order
            )
          )
          ORDER BY pta.display_order NULLS LAST, pta.attribute_id
        ) FILTER (WHERE pta.attribute_id IS NOT NULL),
        '[]'::json
      ) AS attributes
      FROM ${sql.identifier([this.tableName])} pt
      LEFT JOIN ${sql.identifier([
        this.attributesTableName,
      ])} pta ON pt.id = pta.product_type_id
      WHERE pt.id = ${id}
      GROUP BY pt.id
    `;

    const result = await this.pool.query(query);
    return result.rows[0] ? Some(this.mapper.toDomain(result.rows[0])) : None;
  }

  // Override insert to handle product_type_attributes
  override async insert(
    productType: ProductTypeEntity | ProductTypeEntity[],
  ): Promise<void> {
    const entities = Array.isArray(productType) ? productType : [productType];

    await this.transaction(async () => {
      for (const entity of entities) {
        const record = this.mapper.toPersistence(entity);
        const { attributes, ...productTypeData } = record;

        // Insert main entity
        const mainInsertQuery = this.generateInsertQuery([
          productTypeData as ProductTypeModel,
        ]);
        await this.writeQuery(mainInsertQuery, entity);

        // Insert attribute associations
        if (attributes && attributes.length > 0) {
          for (const attr of attributes) {
            await this.pool.query(sql`
              INSERT INTO product_type_attributes (
                product_type_id, attribute_id, is_required, 
                is_filterable, is_searchable, display_order, created_at
              ) VALUES (
                ${productTypeData.id}, ${attr.attributeId}, 
                ${attr.config.isRequired}, ${attr.config.isFilterable}, 
                ${attr.config.isSearchable}, ${attr.config.displayOrder},
                CURRENT_TIMESTAMP
              )
            `);
          }
        }
      }
    });

    Array.isArray(productType)
      ? productType.forEach((pt) =>
          pt.publishEvents(this.logger, this.eventEmitter),
        )
      : productType.publishEvents(this.logger, this.eventEmitter);
  }

  // Override update to handle product_type_attributes delta
  override async update(entity: ProductTypeEntity): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    const { attributes: newAttributes, ...productTypeData } = record;

    await this.transaction(async () => {
      // Update main entity
      const mainUpdateQuery = this.generateUpdateQuery(
        productTypeData as ProductTypeModel,
      );
      await this.writeQuery(mainUpdateQuery, entity);

      // Handle attribute associations delta
      const currentAttributesResult = await this.pool.query(sql`
        SELECT attribute_id FROM product_type_attributes 
        WHERE product_type_id = ${productTypeData.id}
      `);
      const currentAttributeIds = currentAttributesResult.rows.map((row) =>
        row.attribute_id!.toString(),
      );
      const newAttributeIds = newAttributes?.map((a) => a.attributeId) || [];

      // Delete removed associations
      const attributesToDelete = currentAttributeIds.filter(
        (id) => !newAttributeIds.includes(id),
      );
      if (attributesToDelete.length > 0) {
        await this.pool.query(sql`
          DELETE FROM product_type_attributes 
          WHERE product_type_id = ${productTypeData.id}
          AND attribute_id = ANY(${sql.array(attributesToDelete, 'uuid')})
        `);
      }

      // Insert or update associations
      if (newAttributes && newAttributes.length > 0) {
        for (const attr of newAttributes) {
          const isExisting = currentAttributeIds.includes(attr.attributeId);

          if (isExisting) {
            await this.pool.query(sql`
              UPDATE product_type_attributes SET
                is_required = ${attr.config.isRequired},
                is_filterable = ${attr.config.isFilterable},
                is_searchable = ${attr.config.isSearchable},
                display_order = ${attr.config.displayOrder}
              WHERE product_type_id = ${productTypeData.id}
              AND attribute_id = ${attr.attributeId}
            `);
          } else {
            await this.pool.query(sql`
              INSERT INTO product_type_attributes (
                product_type_id, attribute_id, is_required, 
                is_filterable, is_searchable, display_order, created_at
              ) VALUES (
                ${productTypeData.id}, ${attr.attributeId}, 
                ${attr.config.isRequired}, ${attr.config.isFilterable}, 
                ${attr.config.isSearchable}, ${attr.config.displayOrder},
                CURRENT_TIMESTAMP
              )
            `);
          }
        }
      }
    });
  }

  // Override delete to handle cascade (though DB handles this via ON DELETE CASCADE)
  override async delete(entity: ProductTypeEntity): Promise<boolean> {
    // Use base class for main entity deletion
    const result = await super.delete(entity);

    return result!;
  }
}
