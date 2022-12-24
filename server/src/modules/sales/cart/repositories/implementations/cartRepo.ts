import { ICartRepo } from '../cartRepo.js';
import { Cart } from '../../domain/Cart.js';
import { CartDetails } from '../../domain/CartDetails.js';
import { CartMap } from '../../mappers/CartMap.js';

import { CartDetailsMap } from '../../mappers/CartDetailsMap.js';
import { Maybe, nothing } from '../../../../../shared/core/Maybe.js';
import { Repository } from 'typeorm';
import { Cart as PersistenceCart } from '../../../../../shared/infra/database/typeorm/models/index.js';

export class CartRepo implements ICartRepo {
  constructor(private repo: Repository<PersistenceCart>) {}

  async save(cart: Cart): Promise<void> {
    const mappedCart = CartMap.toPersistence(cart);
    const cartModel = this.repo.create(mappedCart);

    await this.repo.save(cartModel);
  }

  retrieveByUser(userId: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  retrieveDetailsByUser(userId: string): Promise<CartDetails> {
    throw new Error('Method not implemented.');
  }
  async retrieve(cartId: string): Promise<Maybe<Cart>> {
    const rawCart = await this.repo.findOne({
      where: {
        id: cartId,
      },
      relations: {
        user: true,
        cartItems: {
          product: true,
        },
      },
    });
    if (!rawCart) {
      return nothing;
    }
    const cart = CartMap.toDomain(rawCart);
    return cart;
  }
  async retrieveDetails(cartId: string): Promise<Maybe<CartDetails>> {
    const rawProduct = await this.repo.findOne({
      where: {
        id: cartId,
      },
      relations: {
        user: true,
        cartItems: {
          product: true,
        },
      },
    });
    if (!rawProduct) {
      return nothing;
    }
    const product = CartDetailsMap.toDomain(rawProduct);
    return product;
  }

  async exists(id: string): Promise<boolean> {
    const findResult = await this.repo.findOne({
      where: {
        id,
      },
    });
    return !!findResult;
  }

  async delete(id: string): Promise<void> {
    // return this.transactionalEntityManager.transaction(
    //   async (transactionalEntityManager) => {
    //     const cart = await transactionalEntityManager.findOneBy(
    //       PersistenceCart,
    //       {
    //         id,
    //       },
    //     );

    //     if (!cart) {
    //       return;
    //     }

    //     await transactionalEntityManager.remove(
    //       PersistenceCartItem,
    //       cart.cartItems,
    //     );

    //     await transactionalEntityManager.remove(PersistenceCart, cart);
    //   },
    // );
    await this.repo.delete(id);
  }
}
