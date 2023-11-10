import { CartPrimitives } from '../create-cart/create-cart.handler';

export class AddCartLineItemCommand {
  public readonly cart: CartPrimitives;

  public readonly productId: string;

  public readonly quantity: number;

  constructor(props: AddCartLineItemCommand) {
    Object.assign(this, props);
  }
}
