import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CategoryEntity } from '@modules/product-catalog/domain/category.entity';
import { CategoryRepositoryPort } from '@modules/product-catalog/domain/ports/category.repository.port';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { CategoryMapper } from '../mappers/category.mapper';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const categorySchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  slug: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  parent_id: z.string().uuid().nullable(),
});

export type CategoryModel = z.TypeOf<typeof categorySchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class CategoryRepository
  extends SqlRepositoryBase<CategoryEntity, CategoryModel>
  implements CategoryRepositoryPort
{
  protected tableName = 'categories';

  protected schema = categorySchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: CategoryMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(CategoryRepository.name));
  }
  async findOneBySlug(slug: string): Promise<CategoryEntity | null> {
    const category = await this.pool.one(
      sql.type(categorySchema)`SELECT * FROM "categories" WHERE slug = ${slug}`,
    );

    return this.mapper.toDomain(category);
  }
}
