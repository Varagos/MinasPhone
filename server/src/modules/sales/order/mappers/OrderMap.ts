import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import {
  Order as PersistenceOrder,
  OrderItem as PersistenceOrderItem,
} from '../../../../shared/infra/database/typeorm/models/index.js';
import { DeepPartial } from 'typeorm';
import { Order } from '../domain/Order.js';
import { OrderItem } from '../domain/item/OrderItem.js';
import { Quantity } from '../../../common/primitives/Quantity.js';
import { ProductId } from '../domain/item/ProductId.js';
import { Money } from '../../../common/primitives/Money.js';

export class OrderMap implements Mapper<Order> {
  public static toPersistence(order: Order): DeepPartial<PersistenceOrder> {
    const persistenceOrderItems: DeepPartial<PersistenceOrderItem[]> =
      order.items.map((item) => ({
        id: item.id.toString(),
        quantity: item.quantity.value,
        unitPrice: item.unitPrice.value,
        product: {
          id: item.productId.id.toString(),
        },
      }));
    return {
      id: order.id.toString(),
      total: order.total().value,
      orderItems: persistenceOrderItems,
      status: order.status,
      contactInfo: {
        firstName: order.contactInfo.firstName,
        lastName: order.contactInfo.lastName,
        email: order.contactInfo.email,
        phone: order.contactInfo.phone,
      },
    };
  }

  public static toDomain(raw: PersistenceOrder): Order {
    const orderItems = raw.orderItems.map((item) =>
      OrderItem.create(
        {
          quantity: Quantity.create({ value: item.quantity }).getValue(),
          unitPrice: Money.create({ value: item.unitPrice }).getValue(),
          productId: ProductId.create(
            new UniqueEntityID(item.product.id),
          ).getValue(),
        },
        new UniqueEntityID(item.id),
      ).getValue(),
    );

    const productOrError = Order.create(
      {
        items: orderItems,
        contactInfo: raw.contactInfo,
        status: raw.status,
      },
      new UniqueEntityID(raw.id),
    );

    productOrError.isFailure && console.log(productOrError.getErrorValue());

    return productOrError.getValue();
  }
}
