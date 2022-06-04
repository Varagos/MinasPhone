import { Product } from '../domain/Product';
import { ProductDetails } from './../domain/ProductDetails';

export interface IProductRepo {
  getAll(): Promise<ProductDetails[]>;
  getOneById(id: string): Promise<ProductDetails>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
