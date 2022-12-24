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
        unitPrice: item.product.price,
        quantity: item.quantity,
      })),
    });

    orderOrError.isFailure && console.log(orderOrError.getErrorValue());

    return orderOrError.getValue();
  }

  public static toDTO(orderDetails: OrderDetails): OrderDTO {
    return {
      id: orderDetails.id,
      items: orderDetails.items,
    };
  }
}
