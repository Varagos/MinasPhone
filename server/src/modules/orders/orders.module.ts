import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCartCommandHandler } from './application/carts/commands/create-cart/create-cart.handler';
import { UpdateCartLineItemCommandHandler } from './application/carts/commands/update-cart/update-cart-line-item.handler';
import { RemoveCartLineItemCommandHandler } from './application/carts/commands/remove-line-item/remove-cart-line-item.handler';
import { FetchCartQueryHandler } from './application/carts/queries/fetch-cart/fetch-cart.handler';
import { AddCartLineItemCommandHandler } from './application/carts/commands/add-line-item/add-cart-line-item.handler';
import { ORDER_REPO } from './constants';
import { OrderRepository } from './infra/database/order.repository';
import { OrderMapper } from './infra/mappers/order.mapper';
import { CheckoutOrderCommandHandler } from './application/orders/commands/checkout-order/checkout-order.handler';
import { FindOrderByIdQueryHandler } from './application/orders/queries/find-order-by-id/find-order-by-id.handler';
import { FindOrderBySlugQueryHandler } from './application/orders/queries/find-order-by-slug/find-order-by-slug.handler';
import { FindOrdersQueryHandler } from './application/orders/queries/find-orders/find-orders.handler';
import { UpdateOrderStatusCommandHandler } from './application/orders/commands/update-order-status/update-order-status.handler';
import { DeleteOrderCommandHandler } from './application/orders/commands/delete-order/delete-order.handler';
import { OrderProcessingSaga } from './application/orders/sagas/checkout-order/order-processing.saga';
import { ConfirmOrderCommandHandler } from './application/orders/commands/confirm-order/confirm-order.handler';

const sagas: Provider[] = [OrderProcessingSaga];

const commandHandlers: Provider[] = [
  // Cart
  CreateCartCommandHandler,
  UpdateCartLineItemCommandHandler,
  RemoveCartLineItemCommandHandler,
  AddCartLineItemCommandHandler,
  // Order
  CheckoutOrderCommandHandler,
  UpdateOrderStatusCommandHandler,
  ConfirmOrderCommandHandler,
  DeleteOrderCommandHandler,
];

const queryHandlers: Provider[] = [
  FetchCartQueryHandler,
  // Orders
  FindOrderByIdQueryHandler,
  FindOrderBySlugQueryHandler,
  FindOrdersQueryHandler,
];

const eventHandlers: Provider[] = [];

const mappers: Provider[] = [OrderMapper];

const repositories: Provider[] = [
  { provide: ORDER_REPO, useClass: OrderRepository },
];

const services: Provider[] = [];

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    ...repositories,
    ...sagas,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...mappers,
    ...services,
  ],
})
export class OrdersModule {}
