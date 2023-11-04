import { Mapper } from '@libs/ddd';
import { Injectable } from '@nestjs/common';
import { OrderModel, orderSchema } from '../database/order.repository';
import { OrderEntity, OrderStatus } from '@modules/orders/domain/order.entity';
import { OrderLineItemEntity } from '@modules/orders/domain/order-line-item.entity';
import { ContactInfo } from '@modules/orders/domain/value-objects/contact-info.value-object';
import { Email } from '@libs/ddd/standard-value-objects/email.value-object';
import { PhoneNumber } from '@libs/ddd/standard-value-objects/phone-number.value-object';
import { OrderResponseDto } from '@modules/orders/application/orders/dtos/order.response.dto';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class OrderMapper
  implements Mapper<OrderEntity, OrderModel, OrderResponseDto>
{
  toPersistence(entity: OrderEntity): OrderModel {
    const copy = entity.getPropsCopy();
    const record: OrderModel = {
      id: copy.id,
      created_at: copy.createdAt,
      updated_at: copy.updatedAt,
      first_name: copy.contactInfo.firstName,
      last_name: copy.contactInfo.lastName,
      email: copy.contactInfo.email,
      phone: copy.contactInfo.phone,
      line_items: copy.lineItems.map((item) => ({
        id: item.id,
        product_id: item.productId,
        quantity: item.quantity,
        item_price: item.itemPrice,
        total_price: item.totalPrice,
        product_image: item.productImage,
        product_name: item.productName,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      })),
      status: copy.status,
      slug: copy.slug,
      total: copy.total,
    };
    return orderSchema.parse(record);
  }

  toDomain(record: OrderModel): OrderEntity {
    const entity = new OrderEntity({
      id: record.id,
      createdAt: new Date(record.created_at),
      updatedAt: new Date(record.updated_at),
      props: {
        lineItems: record.line_items.map(
          (item) =>
            new OrderLineItemEntity({
              id: item.id,
              createdAt: new Date(item.created_at),
              updatedAt: new Date(item.updated_at),
              props: {
                productId: item.product_id,
                quantity: item.quantity,
                itemPrice: item.item_price,
                totalPrice: item.total_price,
                productImage: item.product_image,
                productName: item.product_name,
              },
            }),
        ),
        contactInfo: new ContactInfo({
          firstName: record.first_name,
          lastName: record.last_name,
          email: new Email({ value: record.email }),
          phone: new PhoneNumber({ value: record.phone }),
        }),
        status: record.status,
        slug: record.slug,
        total: record.total,
      },
    });
    return entity;
  }

  toResponse(entity: OrderEntity): OrderResponseDto {
    const props = entity.getPropsCopy();
    const response = new OrderResponseDto(entity);
    response.slug = props.slug;
    response.status = props.status;
    response.lineItems = props.lineItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      itemPrice: item.itemPrice,
      totalPrice: item.totalPrice,
      productImage: item.productImage,
      productName: item.productName,
    }));
    response.contactInfo = {
      firstName: props.contactInfo.firstName,
      lastName: props.contactInfo.lastName,
      email: props.contactInfo.email,
      phone: props.contactInfo.phone,
    };
    response.total = props.total;

    return response;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
