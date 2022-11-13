import { Mapper } from '../../../../shared/infra/Mapper';
import { CartDTO } from '../dtos/cartDTO';
import { CartDetails } from './../domain/CartDetails';

export class CartDetailsMap implements Mapper<CartDetails> {
  public static toDomain(raw: any): CartDetails {
    const cartOrError = CartDetails.create({
      id: raw.id,
      lineItems: raw.items,
    });

    cartOrError.isFailure && console.log(cartOrError.getErrorValue());

    return cartOrError.getValue();
  }

  public static toDTO(cartDetails: CartDetails): CartDTO {
    return {
      id: cartDetails.id,
      items: cartDetails.items,
    };
  }
}
