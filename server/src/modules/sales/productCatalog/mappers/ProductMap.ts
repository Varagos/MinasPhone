import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { Mapper } from '../../../../shared/infra/Mapper';
import { Category } from '../domain/Category';
import { Product } from '../domain/Product';

export class ProductMap implements Mapper<Product> {
  public static toPersistence(product: Product): any {
    return {
      id: product.id.toString(),
      name: product.name,
      active: product.active,
      slug: product.slug,
      description: product.description,
      quantity: product.quantity,
      media_filename: product.mediaFileName,
      sku: product.sku,
      price: product.price,
      category_id: product.categoryId,
    };
  }

  public static toDomain(raw: any): Product {
    const productOrError = Product.create(
      {
        name: raw.name,
        active: raw.active,
        slug: raw.slug,
        description: raw.description,
        quantity: raw.quantity,
        mediaFileName: raw.media_filename,
        sku: raw.sku,
        price: raw.price,
        categoryId: raw.category_id,
      },
      new UniqueEntityID(raw.id),
    );

    productOrError.isFailure && console.log(productOrError.getErrorValue());

    return productOrError.getValue();
  }
}
