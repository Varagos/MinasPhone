import { RepositoryPort } from '@libs/ddd';
import { ProductTypeEntity } from '../product-type.entity';

export type ProductTypeRepositoryPort = RepositoryPort<ProductTypeEntity>;
