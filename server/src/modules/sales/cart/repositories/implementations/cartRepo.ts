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

  // async getAll(): Promise<CategoryDetails[]> {
  //   const CategoryModel = this.models.Category;
  //   const rawCategories = await CategoryModel.findAll();
  //   const categories = rawCategories.map((cat: any) =>
  //     CategoryDetailsMap.toDomain(cat),
  //   );
  //   return categories;
  // }

  // async getOneById(id: string): Promise<CategoryDetails> {
  //   const CategoryModel = this.models.Category;
  //   const rawCategory = await CategoryModel.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   const category = CategoryDetailsMap.toDomain(rawCategory);
  //   return category;
  // }

  // async save(category: Category): Promise<any> {
  //   const CategoryModel = this.models.Category;
  //   const rawSequelizeCategory = CategoryMap.toPersistence(category);

  //   try {
  //     await CategoryModel.create(rawSequelizeCategory);
  //   } catch (err: any) {
  //     throw new Error(err.toString());
  //   }
  // }

  // async update(category: Category): Promise<any> {
  //   const CategoryModel = this.models.Category;
  //   const rawSequelizeCategory = CategoryMap.toPersistence(category);

  //   const { id, ...rest } = rawSequelizeCategory;
  //   try {
  //     await CategoryModel.update(rest, {
  //       where: {
  //         id,
  //       },
  //     });
  //   } catch (err: any) {
  //     throw new Error(err.toString());
  //   }
  // }

  // async delete(id: string): Promise<void> {
  //   const CategoryModel = this.models.Category;

  //   try {
  //     await CategoryModel.destroy({
  //       where: {
  //         id,
  //       },
  //     });
  //   } catch (err: any) {
  //     throw new Error(err.toString());
  //   }
  // }
}
