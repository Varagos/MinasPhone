import { ICartRepo } from '../cartRepo';
import { Cart } from '../../domain/Cart';
import { CartDetails } from '../../domain/CartDetails';

export class CartRepo implements ICartRepo {
  private models: Record<string, any>;

  constructor(models: Record<string, any>) {
    this.models = models;
  }
  retrieveByUser(userId: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  retrieveDetailsByUser(userId: string): Promise<CartDetails> {
    throw new Error('Method not implemented.');
  }
  retrieve(userId: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }
  retrieveDetails(userId: string): Promise<CartDetails> {
    throw new Error('Method not implemented.');
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
