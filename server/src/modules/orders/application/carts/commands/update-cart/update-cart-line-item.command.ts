import { CartPrimitives } from '../create-cart/create-cart.handler';

export class UpdateCartLineItemCommand {
  public readonly id: string;

  public readonly quantity: number;

  public readonly cart: CartPrimitives;

  constructor(props: UpdateCartLineItemCommand) {
    Object.assign(this, props);
  }
}
