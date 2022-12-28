import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID.js';
import { Mapper } from '../../../../shared/infra/Mapper.js';
import { Product } from '../domain/Product.js';
import { Product as PersistenceProduct } from '../../../../shared/infra/database/typeorm/models/index.js';
import { DeepPartial } from 'typeorm';

export class ProductMap implements Mapper<Product> {
  public static toPersistence(
    product: Product,
  ): DeepPartial<PersistenceProduct> {
    return {
      id: product.id.toString(),
      name: product.name,
      active: product.active,
      slug: product.slug,
      description: product.description,
      quantity: product.quantity,
      mediaFilename: product.mediaFileName,
      sku: product.sku,
      price: product.price,
      category: { id: product.categoryId },
    };
  }

  public static toDomain(raw: PersistenceProduct): Product {
    const productOrError = Product.create(
      {
        name: raw.name,
        active: raw.active,
        slug: raw.slug,
        description: raw.description,
        quantity: raw.quantity,
        mediaFileName: raw.mediaFilename,
        sku: raw.sku,
        price: raw.price,
        categoryId: raw.category?.id,
      },
      new UniqueEntityID(raw.id),
    );

    productOrError.isFailure && console.log(productOrError.getErrorValue());

    return productOrError.getValue();
  }
}
