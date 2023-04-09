import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductEntity } from '@modules/product-catalog/domain/product.entity';
import { MimeType } from '@modules/product-catalog/domain/value-objects/image.value-object';
import { ProductRepositoryPort } from '@modules/product-catalog/domain/ports/product.repository.port';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { ProductMapper } from '../mappers/product.mapper';

const mimeTypeValues = Object.values(MimeType).filter(
  (value) => typeof value === 'string',
) as string[];

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
  image_data: z.instanceof(Buffer),
  image_mimetype: z.nativeEnum(MimeType),
  sku: z.string().nullable(),
  category_id: z.string().uuid(),
});

export type ProductModel = z.TypeOf<typeof productSchema>;

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
