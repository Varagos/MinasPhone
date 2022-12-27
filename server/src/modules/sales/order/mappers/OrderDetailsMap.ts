import { Mapper } from '../../../../shared/infra/Mapper.js';
import { OrderDTO } from '../dtos/orderDTO.js';
import { Order as PersistenceOrder } from '../../../../shared/infra/database/typeorm/models/index.js';
import { OrderDetails } from '../domain/OrderDetails.js';

export class OrderDetailsMap implements Mapper<OrderDetails> {
  public static toDomain(raw: PersistenceOrder): OrderDetails {
    const orderOrError = OrderDetails.create({
      id: raw.id,
      items: raw.orderItems.map((item) => ({
        productId: item.product.id,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        productName: item.name,
      })),
      status: raw.status,
      total: raw.total,
      firstName: raw.contactInfo.firstName,
      lastName: raw.contactInfo.lastName,
      email: raw.contactInfo.email,
      phone: raw.contactInfo.phone,
      date: raw.createdAt,
    });

    orderOrError.isFailure && console.log(orderOrError.getErrorValue());

    return orderOrError.getValue();
  }

  public static toDTO(orderDetails: OrderDetails): OrderDTO {
    return {
      id: orderDetails.id,
      items: orderDetails.items,
      status: orderDetails.status,
      total: orderDetails.total,
      firstName: orderDetails.firstName,
      lastName: orderDetails.lastName,
      email: orderDetails.email,
      phone: orderDetails.phone,
      date: orderDetails.date,
    };
  }
}
