import { Result } from '../../../../shared/core/Result';
import { Product } from '../domain/Product';
import { ProductDetails } from '../domain/ProductDetails';

export interface IProductRepo {
  getAll(): Promise<ProductDetails[]>;
  getById(id: string): Promise<Product | null>;
  getOneById(id: string): Promise<ProductDetails>;
  save(product: Product): Promise<Result<any>>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
