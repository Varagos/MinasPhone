import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { Inject, Logger } from '@nestjs/common';
import { CheckoutOrderCommand } from './checkout-order.command';
import { OrderEntity } from '@modules/orders/domain/order.entity';
import { OrderLineItemEntity } from '@modules/orders/domain/order-line-item.entity';
import { ContactInfo } from '@modules/orders/domain/value-objects/contact-info.value-object';
import { Email, PhoneNumber } from '@libs/ddd/standard-value-objects';
import { OrderRepositoryPort } from '@modules/orders/domain/ports/order.repository.port';
import { ORDER_REPO } from '@modules/orders/constants';
import { FindProductsByIdsQuery } from '@modules/product-catalog/application/products/queries/find-products-by-ids/find-products-by-ids.query';
import { FindProductsByIdsQueryResponse } from '@modules/product-catalog/application/products/queries/find-products-by-ids/find-products-by-ids.handler';
import { ProductModel } from '@modules/product-catalog/infra/database/product.repository';
import { RequestContextService } from '@libs/application/context/AppRequestContext';
import { OrderCreatedResponseDto } from '../../dtos/order-created.response.dto';

export type CheckoutOrderCommandResponse = Result<
  OrderCreatedResponseDto,
  never
>;

@CommandHandler(CheckoutOrderCommand)
export class CheckoutOrderCommandHandler
  implements ICommandHandler<CheckoutOrderCommand>
{
  private readonly logger = new Logger(CheckoutOrderCommandHandler.name);

  constructor(
    @Inject(ORDER_REPO)
    protected readonly orderRepo: OrderRepositoryPort,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(
    command: CheckoutOrderCommand,
  ): Promise<CheckoutOrderCommandResponse> {
    this.logger.log(
      'Start executing CheckoutOrderCommand...' + JSON.stringify(command),
    );
    const productIds = command.lineItems.map((item) => item.productId);
    const products: FindProductsByIdsQueryResponse =
      await this.queryBus.execute(
        new FindProductsByIdsQuery({ ids: productIds }),
      );
    if (products.isErr()) {
      throw new Error('Products not found');
    }
    const productsByIds = products.unwrap().reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {} as Record<string, Readonly<ProductModel>>);
    const lineItems = command.lineItems.map((item) => {
      const { productId, quantity } = item;
      const itemPrice = productsByIds[productId].price;
      return OrderLineItemEntity.create({
        productId,
        quantity,
        itemPrice,
        totalPrice: itemPrice * quantity,
        productImage: productsByIds[productId].image_uri,
        productName: productsByIds[productId].name,
      });
    });

    const email = new Email({ value: command.contactInfo.email });
    const phone = new PhoneNumber({ value: command.contactInfo.phone });
    const contactInfo = new ContactInfo({
      firstName: command.contactInfo.firstName,
      lastName: command.contactInfo.lastName,
      email,
      phone,
    });
    const order = OrderEntity.create({
      lineItems,
      contactInfo,
    });

    try {
      /* Wrapping operation in a transaction to make sure
         that all domain events are processed atomically */
      await this.orderRepo.transaction(async () =>
        this.orderRepo.insert(order),
      );
      this.logger.log(
        `Order [id:${order.id},slug:${
          order.slug
        }] has been created, ${RequestContextService.getRequestId()}`,
      );
      return Ok({
        id: order.id,
        slug: order.slug,
      });
    } catch (error: any) {
      throw error;
    }
  }
}
