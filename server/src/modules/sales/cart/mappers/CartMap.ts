import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { Money } from '../../../common/primitives/Money.js';
import { Quantity } from '../../../common/primitives/Quantity.js';
import { Cart } from '../domain/Cart.js';
import { CartItem } from '../domain/item/CartItem.js';
import { ProductId } from '../domain/item/ProductId.js';
import { Cart as PersistenceCart } from '../../../../shared/infra/database/typeorm/models/index.js';
import { CartItem as PersistenceCartItem } from '../../../../shared/infra/database/typeorm/models/index.js';
import { DeepPartial } from 'typeorm';

export class CartMap implements Mapper<Cart> {
  public static toPersistence(cart: Cart): DeepPartial<PersistenceCart> {
    const items: DeepPartial<PersistenceCartItem[]> = cart.lineItems.map(
      (item) => ({
        id: item.id.toString(),
        quantity: item.quantity.value,
        product: { id: item.productId.id.toString() },
        cart: { id: cart.id.toString() },
      }),
    );

    return {
      id: cart.id.toString(),
      cartItems: items,
    };
  }

  public static toDomain(raw: PersistenceCart): Cart {
    const items = raw.cartItems;
    const lineItems = items.map((item) =>
      CartItem.create(
        {
          productId: ProductId.create(
            new UniqueEntityID(item.product.id),
          ).getValue(),
          quantity: Quantity.create({ value: item.quantity }).getValue(),
          title: item.product.name,
          unitPrice: Money.create({ value: item.product.price }).getValue(),
          productMediaFileName: item.product.mediaFilename,
        },
        new UniqueEntityID(item.id),
      ).getValue(),
    );

    const cartOrError = Cart.create(
      {
        lineItems,
      },
      new UniqueEntityID(raw.id),
    );

    cartOrError.isFailure && console.log(cartOrError.getErrorValue());

    return cartOrError.getValue();
  }
}
