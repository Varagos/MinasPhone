import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductEntity } from '@modules/product-catalog/domain/product.entity';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { ProductMapper } from '../mappers/product.mapper';
import { None, Option, Some } from 'oxide.ts';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const productSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  slug: z.string().min(1).max(255),
  price: z.number().min(0),
  quantity: z.number().min(0),
  active: z.boolean(),
  image_uri: z.string(),
  sku: z.string().max(255).nullable().optional(),
  category_id: z.string().uuid(),
  product_type_id: z.string().uuid().nullable().optional(),
  attribute_values: z
    .record(
      z.string(),
      z.array(
        z.object({
          value_id: z.string().uuid().nullable(),
          text_value: z.string().nullable(),
          numeric_value: z.number().nullable(),
          boolean_value: z.boolean().nullable(),
        }),
      ),
    )
    .optional(),
});

export type ProductModel = z.TypeOf<typeof productSchema>;

export const productSitemapSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1).max(255),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
});

export type ProductSitemapModel = z.TypeOf<typeof productSitemapSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class ProductRepository
  extends SqlRepositoryBase<ProductEntity, ProductModel>
  implements ProductRepositoryPort
{
  protected tableName = 'products';

  protected schema = productSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: ProductMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(ProductRepository.name));
  }

  // Override findOneById to join with product_attribute_values
  override async findOneById(id: string): Promise<Option<ProductEntity>> {
    const query = sql.type(this.schema)`
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
      FROM ${sql.identifier([this.tableName])} p
      WHERE p.id = ${id}
    `;

    const result = await this.pool.query(query);
    return result.rows[0] ? Some(this.mapper.toDomain(result.rows[0])) : None;
  }

  async findManyByIds(ids: string[]): Promise<ProductEntity[]> {
    const products = await this.pool.any(
      sql.type(productSchema)`
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
        FROM ${sql.identifier([this.tableName])} p
        WHERE p.id = ANY(${sql.array(ids, 'uuid')})
      `,
    );

    return products.map(this.mapper.toDomain);
  }

  async updateMany(products: ProductEntity[]): Promise<void> {
    await this.pool.transaction(async (transaction) => {
      await transaction.query(sql`BEGIN`);
      for (const product of products) {
        const record = this.mapper.toPersistence(product);
        const query = this.generateUpdateQuery(record);
        await transaction.query(query);
      }
      await transaction.query(sql`COMMIT`);
    });

    await Promise.all(
      products.map((entity) =>
        entity.publishEvents(this.logger, this.eventEmitter),
      ),
    );
  }

  async findBySlug(slug: string): Promise<ProductEntity | null> {
    const product = await this.pool.maybeOne(
      sql.type(productSchema)`
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
        FROM ${sql.identifier([this.tableName])} p
        WHERE p.slug = ${slug}
      `,
    );

    return this.mapper.toDomain(product);
  }

  async findByCategoryId(categoryId: string): Promise<ProductEntity[]> {
    const products = await this.pool.any(
      sql.type(productSchema)`
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
        FROM ${sql.identifier([this.tableName])} p
        WHERE p.category_id = ${categoryId}
      `,
    );

    return products.map(this.mapper.toDomain);
  }

  // Override insert to handle product_attribute_values
  override async insert(
    product: ProductEntity | ProductEntity[],
  ): Promise<void> {
    const entities = Array.isArray(product) ? product : [product];

    await this.transaction(async () => {
      for (const entity of entities) {
        const record = this.mapper.toPersistence(entity);

        // Insert main product record
        const mainInsertQuery = this.generateInsertQuery([record]);
        await this.writeQuery(mainInsertQuery, entity);

        // Insert attribute values if they exist
        const productAttributes = entity.productAttributes;
        if (productAttributes && productAttributes.size > 0) {
          for (const [attributeId, values] of productAttributes.entries()) {
            for (const value of values) {
              await this.pool.query(sql`
                INSERT INTO product_attribute_values (
                  product_id, attribute_id, attribute_value_id,
                  text_value, numeric_value, boolean_value, created_at, updated_at
                ) VALUES (
                  ${entity.id}, ${attributeId}, ${value.valueId},
                  ${value.textValue}, ${value.numericValue}, ${value.booleanValue},
                  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
                )
              `);
            }
          }
        }
      }
    });

    // Publish events
    Array.isArray(product)
      ? product.forEach((p) => p.publishEvents(this.logger, this.eventEmitter))
      : product.publishEvents(this.logger, this.eventEmitter);
  }

  // Override update to handle product_attribute_values delta
  override async update(entity: ProductEntity): Promise<void> {
    const record = this.mapper.toPersistence(entity);

    await this.transaction(async () => {
      // Update main product record
      const mainUpdateQuery = this.generateUpdateQuery(record);
      await this.writeQuery(mainUpdateQuery, entity);

      // Handle attribute values: delete all and re-insert (simpler approach)
      await this.pool.query(sql`
        DELETE FROM product_attribute_values
        WHERE product_id = ${entity.id}
      `);

      // Insert new attribute values
      const productAttributes = entity.productAttributes;
      if (productAttributes && productAttributes.size > 0) {
        for (const [attributeId, values] of productAttributes.entries()) {
          for (const value of values) {
            await this.pool.query(sql`
              INSERT INTO product_attribute_values (
                product_id, attribute_id, attribute_value_id,
                text_value, numeric_value, boolean_value, created_at, updated_at
              ) VALUES (
                ${entity.id}, ${attributeId}, ${value.valueId},
                ${value.textValue}, ${value.numericValue}, ${value.booleanValue},
                CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
              )
            `);
          }
        }
      }
    });

    // Publish events
    entity.publishEvents(this.logger, this.eventEmitter);
  }
}
