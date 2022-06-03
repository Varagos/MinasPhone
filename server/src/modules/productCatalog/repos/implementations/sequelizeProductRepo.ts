import { ProductDetails } from './../../domain/ProductDetails';
import { IProductRepo } from '../productRepo';
import { Product } from '../../domain/Product';
import { ProductMap } from '../../mappers/ProductMap';
import { ProductDetailsMap } from '../../mappers/ProductDetailsMap';

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

  async save(product: Product): Promise<any> {
    const ProductModel = this.models.Product;
    const rawSequelizeProduct = ProductMap.toPersistence(product);

    try {
      await ProductModel.create(rawSequelizeProduct);
    } catch (err: any) {
      throw new Error(err.toString());
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
