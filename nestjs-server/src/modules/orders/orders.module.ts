import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCartCommandHandler } from './application/carts/commands/create-cart/create-cart.handler';
import { UpdateCartLineItemCommandHandler } from './application/carts/commands/update-cart/update-cart-line-item.handler';
import { RemoveCartLineItemCommandHandler } from './application/carts/commands/remove-line-item/remove-cart-line-item.handler';
import { FetchCartQueryHandler } from './application/carts/queries/fetch-cart/fetch-cart.handler';
import { AddCartLineItemCommandHandler } from './application/carts/commands/add-line-item/add-cart-line-item.handler';

const commandHandlers: Provider[] = [
  // Cart
  CreateCartCommandHandler,
  UpdateCartLineItemCommandHandler,
  RemoveCartLineItemCommandHandler,
  AddCartLineItemCommandHandler,
];

const queryHandlers: Provider[] = [FetchCartQueryHandler];

const eventHandlers: Provider[] = [];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  // { provide: CATEGORY_REPO, useClass: CategoryRepository },
];

const services: Provider[] = [];

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...mappers,
    ...services,
  ],
})
export class OrdersModule {}
