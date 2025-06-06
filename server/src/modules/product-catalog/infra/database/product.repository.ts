import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductEntity } from '@modules/product-catalog/domain/product.entity';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { ProductMapper } from '../mappers/product.mapper';

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

  async findManyByIds(ids: string[]): Promise<ProductEntity[]> {
    const products = await this.pool.any(
      sql.type(
        productSchema,
      )`SELECT * FROM "products" WHERE id = ANY(${sql.array(ids, 'uuid')})`,
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
      sql.type(productSchema)`SELECT * FROM "products" WHERE slug = ${slug}`,
    );

    return this.mapper.toDomain(product);
  }

  async findByCategoryId(categoryId: string): Promise<ProductEntity[]> {
    const products = await this.pool.any(
      sql.type(
        productSchema,
      )`SELECT * FROM "products" WHERE category_id = ${categoryId}`,
    );

    return products.map(this.mapper.toDomain);
  }
}
