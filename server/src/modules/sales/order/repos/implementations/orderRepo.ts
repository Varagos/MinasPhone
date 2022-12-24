import { IOrderRepo } from '../orderRepo.js';
import { OrderMap } from '../../mappers/OrderMap.js';
import { OrderDetailsMap } from '../../mappers/OrderDetailsMap.js';
import { Repository } from 'typeorm';
import { Order as PersistenceOrder } from '../../../../../shared/infra/database/typeorm/models/index.js';
import { Maybe, nothing } from '../../../../../shared/core/Maybe.js';
import { OrderDetails } from '../../domain/OrderDetails.js';
import { Order } from '../../domain/Order.js';

export class OrderRepo implements IOrderRepo {
  constructor(private repo: Repository<PersistenceOrder>) {}

  async getAll(): Promise<OrderDetails[]> {
    const rawOrder = await this.repo.find({
      relations: {
        orderItems: true,
      },
    });
    const orders = rawOrder.map((prod) => OrderDetailsMap.toDomain(prod));
    return orders;
  }

  async getById(id: string): Promise<Maybe<Order>> {
    const rawOrder = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        orderItems: true,
      },
    });
    if (!rawOrder) return nothing;

    const order = OrderMap.toDomain(rawOrder);
    return order;
  }

  async getOneById(id: string): Promise<OrderDetails> {
    const rawOrder = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        orderItems: true,
      },
    });
    // TODO: Handle error
    if (!rawOrder) throw new Error('Order not found');
    return OrderDetailsMap.toDomain(rawOrder);
  }
  async save(order: Order): Promise<void> {
    const rawOrder = OrderMap.toPersistence(order);
    const orderModel = this.repo.create(rawOrder);

    await this.repo.save(orderModel);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
