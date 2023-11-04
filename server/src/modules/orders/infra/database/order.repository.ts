import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, QueryResultRow, sql } from 'slonik';
import { z } from 'zod';
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SqlRepositoryBase } from '@libs/db/sql-repository.base';
import { None, Option, Some } from 'oxide.ts';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderEntity, OrderStatus } from '@modules/orders/domain/order.entity';
import { OrderRepositoryPort } from '@modules/orders/domain/ports/order.repository.port';

// export enum OrderStatus {
//   Pending = 'pending',
//   // Paid = 'paid',
//   // Shipped = 'shipped',
//   Delivered = 'delivered',
//   Cancelled = 'cancelled',
// }
export const orderItemSchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid(),
  quantity: z.number().min(1),
  item_price: z.number().min(1),
  total_price: z.number().min(1),
  product_image: z.string().min(1).max(255),
  product_name: z.string().min(1).max(255),
  created_at: z.preprocess((val: any) => new Date(val), z.date()),
  updated_at: z.preprocess((val: any) => new Date(val), z.date()),
});

export type OrderItemModel = z.TypeOf<typeof orderItemSchema>;

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
  status: z.nativeEnum(OrderStatus),
  line_items: z.array(orderItemSchema),
  slug: z.string().min(1).max(255),
  total: z.number(),
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

  override async findOneById(id: string): Promise<Option<OrderEntity>> {
    const query = sql.type(orderSchema)`
         SELECT o.*, 
         array_agg(
            json_build_object(
              'id', oi.id,
              'product_id', oi.product_id,
              'quantity', oi.quantity,
              'item_price', oi.item_price,
              'total_price', oi.total_price,
              'product_image', oi.product_image,
              'product_name', oi.product_name,
              'created_at', oi.created_at,
              'updated_at', oi.updated_at
            )
        ) AS line_items
        FROM ${sql.identifier([this.tableName])} o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE
          o.slug = ${id}
        GROUP BY o.id`;

    const result = await this.pool.query(query);

    return result.rows[0] ? Some(this.mapper.toDomain(result.rows[0])) : None;
  }

  async findOneBySlug(slug: string): Promise<Option<OrderEntity>> {
    const query = sql.type(orderSchema)`
         SELECT o.*, 
         array_agg(
            json_build_object(
              'id', oi.id,
              'product_id', oi.product_id,
              'quantity', oi.quantity,
              'item_price', oi.item_price,
              'total_price', oi.total_price,
              'product_image', oi.product_image,
              'product_name', oi.product_name,
              'created_at', oi.created_at,
              'updated_at', oi.updated_at
            )
        ) AS line_items
        FROM ${sql.identifier([this.tableName])} o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE
          o.slug = ${slug}
        GROUP BY o.id`;

    const result = await this.pool.query(query);

    return result.rows[0] ? Some(this.mapper.toDomain(result.rows[0])) : None;
  }

  override async insert(order: OrderEntity): Promise<void> {
    const record = this.mapper.toPersistence(order);
    const { line_items, ...rest } = record;

    await this.pool.transaction(async (trx) => {
      await trx.query(sql`
      INSERT INTO orders (id, created_at, updated_at, first_name, last_name, email, phone, status, slug, total)
      VALUES (
        ${record.id},
        ${sql.timestamp(record.created_at)},
        ${sql.timestamp(record.updated_at)},
        ${record.first_name},
        ${record.last_name},
        ${record.email},
        ${record.phone},
        ${record.status},
        ${record.slug},
        ${record.total}
      )
    `);

      const orderId = record.id;

      await Promise.all(
        line_items.map(async (item) => {
          await trx.query(sql`
        INSERT INTO order_items (id, created_at, updated_at, order_id, product_id, quantity, item_price, total_price, product_image, product_name)
        VALUES (
          ${item.id},
          ${sql.timestamp(item.created_at)},
          ${sql.timestamp(item.updated_at)},
          ${orderId},
          ${item.product_id},
          ${item.quantity},
          ${item.item_price},
          ${item.total_price},
          ${item.product_image},
          ${item.product_name}
        )
      `);
        }),
      );
    });
  }

  override async update(order: OrderEntity): Promise<void> {
    const record = this.mapper.toPersistence(order);
    const { line_items: newLineItems, ...orderData } = record;

    await this.pool.transaction(async (trx) => {
      // Update the order record
      await trx.query(sql`
        UPDATE ${sql.identifier([this.tableName])}
        SET
          first_name = ${orderData.first_name},
          last_name = ${orderData.last_name},
          email = ${orderData.email},
          phone = ${orderData.phone},
          status = ${orderData.status},
          slug = ${orderData.slug},
          total = ${orderData.total},
          updated_at = ${sql.timestamp(orderData.updated_at)}
        WHERE id = ${orderData.id}
      `);

      // Get current line items from the database
      const currentLineItemsResult = await trx.query(sql`
      SELECT * FROM order_items WHERE order_id = ${orderData.id}
    `);
      const currentLineItems = currentLineItemsResult.rows;

      // Prepare sets for comparison
      const currentLineItemsSet = new Map(
        currentLineItems.map((item) => [item.id as string, item]),
      );
      const newLineItemsSet = new Map(
        newLineItems.map((item) => [item.id as string, item]),
      );

      // Determine the updates and deletions
      for (const [id, currentItem] of currentLineItemsSet) {
        if (!newLineItemsSet.has(id)) {
          // Delete item if it's not in the new list
          await trx.query(sql`
          DELETE FROM order_items WHERE id = ${id}
        `);
        } else {
          const newItem = newLineItemsSet.get(id)!;
          // Check if the item has changes and update accordingly
          if (hasChanges(currentItem, newItem)) {
            await trx.query(sql`
            UPDATE order_items SET
              product_id = ${newItem.product_id},
              quantity = ${newItem.quantity},
              item_price = ${newItem.item_price},
              total_price = ${newItem.total_price},
              product_image = ${newItem.product_image},
              product_name = ${newItem.product_name},
              updated_at = ${sql.timestamp(newItem.updated_at)}
            WHERE id = ${id}
          `);
          }
          // Remove the item from the newLineItemsSet as it's already processed
          newLineItemsSet.delete(id);
        }
      }

      // Insert new items
      for (const newItem of newLineItemsSet.values()) {
        await trx.query(sql`
        INSERT INTO order_items (id, order_id, product_id, quantity, item_price, total_price, product_image, product_name, created_at, updated_at)
        VALUES (
          ${newItem.id},
          ${orderData.id},
          ${newItem.product_id},
          ${newItem.quantity},
          ${newItem.item_price},
          ${newItem.total_price},
          ${newItem.product_image},
          ${newItem.product_name},
          ${sql.timestamp(newItem.created_at)},
          ${sql.timestamp(newItem.updated_at)}
        )
      `);
      }
    });
  }
}

function hasChanges(currentItem: QueryResultRow, newItem: OrderItemModel) {
  // Define the logic to compare current and new item fields
  // Return true if they are different, false otherwise
  // Example:
  return (
    currentItem.product_id !== newItem.product_id ||
    currentItem.quantity !== newItem.quantity ||
    currentItem.item_price !== newItem.item_price ||
    currentItem.total_price !== newItem.total_price ||
    currentItem.product_image !== newItem.product_image ||
    currentItem.product_name !== newItem.product_name
  );
}
