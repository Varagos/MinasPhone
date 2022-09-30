import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../shared/infra/Mapper';
import { Category } from '../domain/Category';
import { Product } from '../domain/Product';

export class ProductMap implements Mapper<Product> {
  public static toPersistence(product: Product): any {
    return {
      id: product.id.toString(),
      name: product.name,
      active: product.active,
      permalink: product.permalink,
      description: product.description,
      quantity: product.quantity,
      media: product.media,
      sku: product.sku,
      price: product.price,
    };
  }

  public static toDomain(raw: any): Product {
    const productOrError = Product.create(
      {
        name: raw.name,
        active: raw.active,
        permalink: raw.permalink,
        description: raw.description,
        quantity: raw.quantity,
        media: raw.media,
        sku: raw.sku,
        price: raw.price,
      },
      new UniqueEntityID(raw.id),
    );

    productOrError.isFailure && // console.log(productOrError.getErrorValue());

    return productOrError.getValue();
  }
}
