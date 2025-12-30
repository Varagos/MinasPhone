import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { None, Option, Some } from 'oxide.ts';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductEntity } from '@modules/product-catalog/domain/product.entity';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { ProductMapper } from '../mappers/product.mapper';
import {
  AttributeEntity,
  InputTypes,
  ValueTypes,
} from '@modules/product-catalog/domain/attribute.entity';
import { AttributeRepositoryPort } from '@modules/product-catalog/domain/ports/attribute.repository.port';
import { AttributeMapper } from '../mappers/attribute.mapper';

/**
 * -- Attributes
CREATE TABLE IF NOT EXISTS attributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    value_type TEXT NOT NULL CHECK (value_type IN ('string', 'number', 'boolean', 'enum', 'multiselect')),
    input_type TEXT CHECK (input_type IN ('text', 'number', 'select', 'multiselect', 'checkbox', 'radio')),
    unit TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Controlled vocabulary for enum/multiselect attributes
CREATE TABLE IF NOT EXISTS attribute_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attribute_id UUID NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(attribute_id, value)
);
 */

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const attributeValueSchema = z.object({
  id: z.string().uuid(),
  attribute_id: z.string().uuid(),
  value: z.string().min(1).max(255),
  display_order: z.number().int(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
});

export type AttributeValueModel = z.TypeOf<typeof attributeValueSchema>;

export const attributeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string().min(1).max(255),
  value_type: z.enum(ValueTypes),
  input_type: z.enum(InputTypes),
  unit: z.string().max(100).nullable().default(null),
  // Different table
  attribute_values: z.array(attributeValueSchema),
});

export type AttributeModel = z.TypeOf<typeof attributeSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class AttributeRepository
  extends SqlRepositoryBase<AttributeEntity, AttributeModel>
  implements AttributeRepositoryPort
{
  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: AttributeMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(AttributeRepository.name));
  }
  async findManyByIds(ids: string[]): Promise<AttributeEntity[]> {
    if (ids.length === 0) return [];

    const query = sql.type(this.schema)`
      SELECT a.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', av.id,
            'attribute_id', av.attribute_id,
            'value', av.value,
            'display_order', av.display_order,
            'created_at', av.created_at,
            'updated_at', av.updated_at
          )
          ORDER BY av.display_order
        ) FILTER (WHERE av.id IS NOT NULL),
        '[]'::json
      ) AS attribute_values
      FROM ${sql.identifier([this.tableName])} a
      LEFT JOIN ${sql.identifier([
        this.attributeValuesTableName,
      ])} av ON a.id = av.attribute_id
      WHERE a.id = ANY(${sql.array(ids, 'uuid')})
      GROUP BY a.id
    `;

    const result = await this.pool.query(query);
    return result.rows.map((row) => this.mapper.toDomain(row));
  }

  protected tableName = 'attributes';
  protected attributeValuesTableName = 'attribute_values';
  protected schema = attributeSchema;

  // Override methods for multi-table operations
  override async findOneById(id: string): Promise<Option<AttributeEntity>> {
    const query = sql.type(this.schema)`
      SELECT a.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', av.id,
            'attribute_id', av.attribute_id,
            'value', av.value,
            'display_order', av.display_order,
            'created_at', av.created_at,
            'updated_at', av.updated_at
          )
          ORDER BY av.display_order
        ) FILTER (WHERE av.id IS NOT NULL),
        '[]'::json
      ) AS attribute_values
      FROM ${sql.identifier([this.tableName])} a
      LEFT JOIN ${sql.identifier([
        this.attributeValuesTableName,
      ])} av ON a.id = av.attribute_id
      WHERE a.id = ${id}
      GROUP BY a.id
    `;

    const result = await this.pool.query(query);
    return result.rows[0] ? Some(this.mapper.toDomain(result.rows[0])) : None;
  }

  override async insert(
    attribute: AttributeEntity | AttributeEntity[],
  ): Promise<void> {
    const entities = Array.isArray(attribute) ? attribute : [attribute];

    await this.transaction(async () => {
      for (const attribute of entities) {
        const record = this.mapper.toPersistence(attribute);
        const { attribute_values, ...attributeData } = record;

        // Use base class writeQuery for the main entity
        // Use base class writeQuery for the main entity
        const mainInsertQuery = this.generateInsertQuery([
          attributeData as AttributeModel,
        ]);
        await this.writeQuery(mainInsertQuery, attribute);

        // Handle child entities manually
        if (attribute_values && attribute_values.length > 0) {
          for (const value of attribute_values) {
            await this.pool.query(sql`
              INSERT INTO attribute_values (
                id, attribute_id, value, display_order, created_at, updated_at
              ) VALUES (
                ${value.id}, ${attributeData.id}, ${value.value}, 
                ${value.display_order}, ${sql.timestamp(value.created_at)}, 
                ${sql.timestamp(value.updated_at)}
              )
            `);
          }
        }
      }
    });

    Array.isArray(attribute)
      ? attribute.forEach((attr) =>
          attr.publishEvents(this.logger, this.eventEmitter),
        )
      : attribute.publishEvents(this.logger, this.eventEmitter);
  }

  override async update(entity: AttributeEntity): Promise<void> {
    const record = this.mapper.toPersistence(entity);
    const { attribute_values: newValues, ...attributeData } = record;

    await this.transaction(async () => {
      // Use base class for main entity update
      const mainUpdateQuery = this.generateUpdateQuery(
        attributeData as AttributeModel,
      );
      await this.writeQuery(mainUpdateQuery, entity);

      // Handle attribute values delta
      const currentValuesResult = await this.pool.query(sql`
        SELECT id FROM attribute_values WHERE attribute_id = ${attributeData.id}
      `);
      const currentValueIds = currentValuesResult.rows.map((row) =>
        row.id!.toString(),
      );
      const newValueIds = newValues?.map((v) => v.id) || [];

      // Delete removed values
      const valuesToDelete = currentValueIds.filter(
        (id) => !newValueIds.includes(id),
      );
      if (valuesToDelete.length > 0) {
        await this.pool.query(sql`
          DELETE FROM attribute_values 
          WHERE id = ANY(${sql.array(valuesToDelete, 'uuid')})
        `);
      }

      // Insert or update values
      if (newValues && newValues.length > 0) {
        for (const value of newValues) {
          const isExisting = currentValueIds.includes(value.id);

          if (isExisting) {
            await this.pool.query(sql`
              UPDATE attribute_values SET
                value = ${value.value},
                display_order = ${value.display_order},
                updated_at = ${sql.timestamp(value.updated_at)}
              WHERE id = ${value.id}
            `);
          } else {
            await this.pool.query(sql`
              INSERT INTO attribute_values (
                id, attribute_id, value, display_order, created_at, updated_at
              ) VALUES (
                ${value.id}, ${attributeData.id}, ${value.value}, 
                ${value.display_order}, ${sql.timestamp(value.created_at)}, 
                ${sql.timestamp(value.updated_at)}
              )
            `);
          }
        }
      }
    });
  }

  override async delete(entity: AttributeEntity): Promise<boolean> {
    let result: boolean;

    await this.transaction(async () => {
      // Delete child entities first (foreign key constraint)
      await this.pool.query(sql`
        DELETE FROM attribute_values WHERE attribute_id = ${entity.id}
      `);

      // Use base class for main entity deletion
      result = await super.delete(entity);
    });

    return result!;
  }
}
