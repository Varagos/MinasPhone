import { ProductDetails } from '../../domain/ProductDetails.js';
import { IProductRepo } from '../productRepo.js';
import { Product } from '../../domain/Product.js';
import { ProductMap } from '../../mappers/ProductMap.js';
import { ProductDetailsMap } from '../../mappers/ProductDetailsMap.js';
import { Result } from '../../../../../shared/core/Result.js';
import { Repository } from 'typeorm';
import { Product as PersistenceProduct } from '../../../../../shared/infra/database/typeorm/models/index.js';
import { Maybe, nothing } from '../../../../../shared/core/Maybe.js';

export class ProductRepo implements IProductRepo {
  constructor(private repo: Repository<PersistenceProduct>) {}

  async getAll(): Promise<ProductDetails[]> {
    const rawProducts = await this.repo.find({
      relations: {
        category: true,
      },
    });
    const products = rawProducts.map((prod) =>
      ProductDetailsMap.toDomain(prod),
    );
    return products;
  }

  async getById(id: string): Promise<Maybe<Product>> {
    const rawProduct = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });
    if (!rawProduct) return nothing;

    const product = ProductMap.toDomain(rawProduct);
    return product;
  }

  async getOneById(id: string): Promise<ProductDetails> {
    const rawProduct = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });
    // TODO - handle not found
    if (!rawProduct) throw new Error('Product not found');
    const product = ProductDetailsMap.toDomain(rawProduct);
    return product;
  }
  async save(product: Product): Promise<Result<any>> {
    const rawProduct = ProductMap.toPersistence(product);
    const productModel = this.repo.create(rawProduct);

    try {
      await this.repo.save(productModel);
      return Result.ok();
    } catch (err: any) {
      console.error('Error saving product', err);
      return Result.fail(err?.message ?? 'Error saving product');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repo.delete(id);
    } catch (err: any) {
      throw new Error(err.toString());
    }
  }
}
