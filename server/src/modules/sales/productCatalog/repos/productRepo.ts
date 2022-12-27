import { Maybe } from '../../../../shared/core/Maybe.js';
import { Result } from '../../../../shared/core/Result.js';
import { GetListRequestDTO } from '../../../../shared/infra/http/models/GetListParams.js';
import { Product } from '../domain/Product.js';
import { ProductDetails } from '../domain/ProductDetails.js';

export interface IProductRepo {
  getAll(params: GetListRequestDTO): Promise<ProductDetails[]>;

  getAllByCategorySlug(slug: string): Promise<ProductDetails[]>;
  getById(id: string): Promise<Maybe<Product>>;
  getOneById(id: string): Promise<ProductDetails>;
  save(product: Product): Promise<Result<any>>;
  delete(id: string): Promise<void>;
}
