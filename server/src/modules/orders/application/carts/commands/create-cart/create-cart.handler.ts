import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { CreateCartCommand } from './create-cart.command';
import { CartEntity } from '@modules/orders/domain/cart.entity';

export type CartPrimitives = {
  id: string;
  lineItems: Array<{
    id: string;
    productId: string;
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCartCommandResponse = Result<CartPrimitives, never>;

@CommandHandler(CreateCartCommand)
export class CreateCartCommandHandler
  implements ICommandHandler<CreateCartCommand>
{
  async execute(): Promise<Result<CartPrimitives, never>> {
    const cart = CartEntity.create({ lineItems: [] });
    const cartPrimitives = cart.toPrimitives();
    return Ok(cartPrimitives);
  }
}
