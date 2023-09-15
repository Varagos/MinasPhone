import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik';
import { z } from 'zod';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderEntity } from '@modules/orders/domain/order.entity';
import { OrderRepositoryPort } from '@modules/orders/domain/ports/order.repository.port';

/**
 * Runtime validation of user object for extra safety (in case database schema changes).
 * https://github.com/gajus/slonik#runtime-validation
 * If you prefer to avoid performance penalty of validation, use interfaces instead.
 */
export const orderSchema = z.object({
  id: z.string().uuid(),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
  first_name: z.string().min(1).max(255),
  last_name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().min(1).max(255),
  status: z.string().min(1).max(255),
  line_items: z.array(
    z.object({
      id: z.string().uuid(),
      product_id: z.string().uuid(),
      quantity: z.number().min(1),
      item_price: z.number().min(1),
      total_price: z.number().min(1),
      product_image: z.string().min(1).max(255),
      product_name: z.string().min(1).max(255),
    }),
  ),
  slug: z.string().min(1).max(255),
});

export type OrderModel = z.TypeOf<typeof orderSchema>;

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class OrderRepository
  extends SqlRepositoryBase<OrderEntity, OrderModel>
  implements OrderRepositoryPort
{
  protected tableName = 'orders';

  protected schema = orderSchema;

  constructor(
    @InjectPool()
    pool: DatabasePool,
    mapper: OrderMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(pool, mapper, eventEmitter, new Logger(OrderRepository.name));
  }
  async findOneBySlug(slug: string): Promise<OrderEntity | null> {
    const category = await this.pool.one(
      sql.type(
        orderSchema,
      )`SELECT * FROM "${this.tableName}" WHERE slug = ${slug}`,
    );

    return this.mapper.toDomain(category);
  }
}
