import { ProductDetails } from '../../domain/ProductDetails.js';
import { IProductRepo } from '../productRepo.js';
import { Product } from '../../domain/Product.js';
import { ProductMap } from '../../mappers/ProductMap.js';
import { ProductDetailsMap } from '../../mappers/ProductDetailsMap.js';
import { Result } from '../../../../../shared/core/Result.js';

export class ProductRepo implements IProductRepo {
  private models: Record<string, any>;

  constructor(models: Record<string, any>) {
    this.models = models;
  }

  async getAll(): Promise<ProductDetails[]> {
    const ProductModel = this.models.Product;
    const rawProducts = await ProductModel.findAll();
    const products = rawProducts.map((prod: any) =>
      ProductDetailsMap.toDomain(prod),
    );
    return products;
  }

  async getById(id: string): Promise<Product> {
    const ProductModel = this.models.Product;
    const rawProduct = await ProductModel.findOne({
      where: {
        id,
      },
    });
    const product = ProductMap.toDomain(rawProduct);
    return product;
  }

  async getOneById(id: string): Promise<ProductDetails> {
    const ProductModel = this.models.Product;
    const rawProduct = await ProductModel.findOne({
      where: {
        id,
      },
    });
    const product = ProductDetailsMap.toDomain(rawProduct);
    return product;
  }
  async save(product: Product): Promise<any> {
    const ProductModel = this.models.Product;
    const rawSequelizeProduct = ProductMap.toPersistence(product);

    try {
      await ProductModel.create(rawSequelizeProduct);
      return Result.ok();
    } catch (err: any) {
      const errorMessage = err?.errors?.[0].message;
      return Result.fail(errorMessage ?? 'Error saving product');
    }
  }

  async update(product: Product): Promise<any> {
    const ProductModel = this.models.Product;
    const rawSequelizeProduct = ProductMap.toPersistence(product);

    const { id, ...rest } = rawSequelizeProduct;
    try {
      await ProductModel.update(rest, {
        where: {
          id,
        },
      });
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }

  async delete(id: string): Promise<void> {
    const ProductModel = this.models.Product;

    try {
      await ProductModel.destroy({
        where: {
          id,
        },
      });
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
