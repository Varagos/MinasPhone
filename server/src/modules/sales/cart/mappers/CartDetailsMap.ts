import { Mapper } from '../../../../shared/infra/Mapper.js';

import { CartDTO } from '../dtos/cartDTO.js';
import { CartDetails } from './../domain/CartDetails.js';
import { Cart as PersistenceCart } from '../../../../shared/infra/database/typeorm/models/index.js';

export class CartDetailsMap implements Mapper<CartDetails> {
  public static toDomain(raw: PersistenceCart): CartDetails {
    const cartOrError = CartDetails.create({
      id: raw.id,
      lineItems: raw.cartItems.map((item) => ({
        id: item.id,
        productId: item.product.id,
        quantity: item.quantity,
        title: item.product.name,
        unitPrice: item.product.price,
        mediaFileName: item.product.mediaFilename,
      })),
      createdAt: raw.createdAt.getTime(),
      updatedAt: raw.updatedAt.getTime(),
    });

    cartOrError.isFailure && console.log(cartOrError.getErrorValue());

    return cartOrError.getValue();
  }

  public static toDTO(cartDetails: CartDetails): CartDTO {
    return {
      id: cartDetails.id,
      items: cartDetails.items.map((item) => ({
        ...item,
        media: {
          src:
            (process.env.SERVER_URL ?? 'http://localhost:8080/') +
            item.mediaFileName,
        },
      })),
      createdAt: cartDetails.createdAt,
      updatedAt: cartDetails.updatedAt,
      subTotal: cartDetails.subTotal,
    };
  }
}
