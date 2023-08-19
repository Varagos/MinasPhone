import { CartPrimitives } from '../create-cart/create-cart.handler';

export class RemoveCartLineItemCommand {
  public readonly id: string;

  public readonly cart: CartPrimitives;

  constructor(props: RemoveCartLineItemCommand) {
    Object.assign(this, props);
  }
}
