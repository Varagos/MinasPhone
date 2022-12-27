import { IOrderRepo } from '../orderRepo.js';
import { OrderMap } from '../../mappers/OrderMap.js';
import { OrderDetailsMap } from '../../mappers/OrderDetailsMap.js';
import { FindManyOptions, Repository } from 'typeorm';
import { Order as PersistenceOrder } from '../../../../../shared/infra/database/typeorm/models/index.js';
import { Maybe, nothing } from '../../../../../shared/core/Maybe.js';
import { OrderDetails } from '../../domain/OrderDetails.js';
import { Order } from '../../domain/Order.js';
import { GetListRequestDTO } from '../../../../../shared/infra/http/models/GetListParams.js';

export class OrderRepo implements IOrderRepo {
  constructor(private repo: Repository<PersistenceOrder>) {}

  async getAll(params: GetListRequestDTO): Promise<OrderDetails[]> {
    const sortField = params.sort?.[0];
    const options: FindManyOptions<PersistenceOrder> = {
      relations: {
        orderItems: {
          product: true,
        },
        contactInfo: true,
      },
    };
    if (sortField) {
      options.order = { [sortField]: params.sort?.[1] };
    }

    if (params.range) {
      const page = params.range[0] + 1;
      const perPage = params.range[1] + 1;
      options.skip = (page - 1) * perPage;
      options.take = perPage;
    }
    if (params.filter) {
      options.where = {
        ...options.where,
        ...params.filter,
      };
    }
    const rawOrder = await this.repo.find(options);
    const orders = rawOrder.map((prod) => OrderDetailsMap.toDomain(prod));
    // console.log('Options: ', options);
    // console.log('Orders: ', orders);
    return orders;
  }

  async getById(id: string): Promise<Maybe<Order>> {
    const rawOrder = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        orderItems: {
          product: true,
        },
        contactInfo: true,
      },
    });
    if (!rawOrder) return nothing;

    const order = OrderMap.toDomain(rawOrder);
    return order;
  }

  async getOneById(id: string): Promise<Maybe<OrderDetails>> {
    const rawOrder = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        orderItems: {
          product: true,
        },
        contactInfo: true,
      },
    });
    if (!rawOrder) return nothing;
    return OrderDetailsMap.toDomain(rawOrder);
  }

  async save(order: Order): Promise<void> {
    const rawOrder = OrderMap.toPersistence(order);
    const orderModel = this.repo.create(rawOrder);

    await this.repo.save(orderModel);
  }

  async updateStatus(order: Order): Promise<void> {
    await this.repo.update(
      { id: order.id.toString() },
      { status: order.status?.value },
    );
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
