import { Result } from '../../../../shared/core/Result.js';
import { Product } from '../domain/Product.js';
import { ProductDetails } from '../domain/ProductDetails.js';

export interface IProductRepo {
  getAll(): Promise<ProductDetails[]>;
  getById(id: string): Promise<Product | null>;
  getOneById(id: string): Promise<ProductDetails>;
  save(product: Product): Promise<Result<any>>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
