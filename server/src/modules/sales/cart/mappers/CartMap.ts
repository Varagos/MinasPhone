import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../../shared/infra/Mapper';
import { Money } from '../../../common/primitives/Money';
import { Quantity } from '../../../common/primitives/Quantity';
import { Cart } from '../domain/Cart';
import { CartItem } from '../domain/item/CartItem';
import { ProductId } from '../domain/item/ProductId';

export class CartMap implements Mapper<Cart> {
  public static toPersistence(cart: Cart): any {
    const items = cart.lineItems.map((item) => ({
      id: item.id.toString(),
      quantity: item.quantity,
      product_id: item.productId.id.toString(),
    }));

    return {
      id: cart.id.toString(),
      items,
    };
  }

  public static toDomain(raw: any): Cart {
    const items = raw.items;
    const lineItems = items.map((item: any) =>
      CartItem.create(
        {
          productId: ProductId.create(
            new UniqueEntityID(item.product_id),
          ).getValue(),
          quantity: Quantity.create(item.quantity).getValue(),
          title: item.title,
          unitPrice: Money.create(item.unitPrice).getValue(),
        },
        new UniqueEntityID(item.id),
      ),
    );

    const categoryOrError = Cart.create(
      {
        lineItems,
      },
      new UniqueEntityID(raw.id),
    );

    categoryOrError.isFailure && console.log(categoryOrError.getErrorValue());

    return categoryOrError.getValue();
  }
}
