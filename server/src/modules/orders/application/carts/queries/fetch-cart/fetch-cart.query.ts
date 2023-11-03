import { CartPrimitives } from '../../commands/create-cart/create-cart.handler';

export class FetchCartQuery {
  public readonly cart: CartPrimitives;

  constructor(props: FetchCartQuery) {
    Object.assign(this, props);
  }
}
